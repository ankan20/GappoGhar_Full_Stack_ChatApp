import { TryCatch } from "../middlewares/error.js";
import { ErroHandler } from "../utils/utility.js";
import { Chat } from "../models/chat.js";
import { User } from "../models/user.js";
import { Message } from "../models/message.js";
import { deleteFilesFromCloudinary, emitEvent } from "../utils/features.js";
import {
  ALERT,
  NEW_ATTACHMENT,
  NEW_MESSAGE_ALERT,
  REFETCH_CHATS,
} from "../constants/events.js";
import { getOtherMember } from "../lib/helper.js";

const newGroupChat = TryCatch(async (req, res, next) => {
  const { name, members } = req.body;

  if (members.length < 2) {
    return next(
      new ErroHandler("Group chat must have at least 3 members", 400)
    );
  }

  const allMembers = [...members, req.user];

  await Chat.create({
    name,
    groupChat: true,
    creator: req.user,
    members: allMembers,
  });

  emitEvent(req, ALERT, allMembers, `Welcome to ${name} group`);
  emitEvent(req, REFETCH_CHATS, members);

  return res.status(201).json({
    success: true,
    message: "New group chat created successfully",
  });
});

const getMyChats = TryCatch(async (req, res, next) => {
  const allChats = await Chat.find({ members: req.user }).populate(
    "members",
    "name avatar"
  );

  const transformedChats = allChats.map(({ _id, name, members, groupChat }) => {
    const otherMember = getOtherMember(members, req.user);

    return {
      _id,
      groupChat,
      name: groupChat ? name : otherMember.name,
      avatar: groupChat
        ? members.slice(0, 3).map(({ avatar }) => avatar.url)
        : [otherMember.avatar.url],
      members: members.reduce((prev, curr) => {
        if (curr._id.toString() !== req.user.toString()) {
          prev.push(curr._id);
        }
        return prev;
      }, []),
    };
  });

  return res.status(200).json({
    success: true,
    chats: transformedChats,
  });
});

const getMyGroups = TryCatch(async (req, res, next) => {
  const chats = await Chat.find({
    members: req.user,
    groupChat: true,
    creator: req.user,
  }).populate("members", "name avatar");

  const groups = chats.map(({ members, _id, groupChat, name }) => ({
    _id,
    groupChat,
    name,
    avatar: members.slice(0, 3).map(({ avatar }) => avatar.url),
  }));

  return res.status(200).json({
    success: true,
    groups,
  });
});

const addMembers = TryCatch(async (req, res, next) => {
  const { chatId, members } = req.body;

  if (!members || members.length < 1) {
    return next(new ErroHandler("Please provide members", 400));
  }

  const chat = await Chat.findById(chatId);

  if (!chat) {
    return next(new ErroHandler("Chat not found", 404));
  }

  if (!chat.groupChat) {
    return next(new ErroHandler("This is not a group chat", 400));
  }

  if (chat.creator.toString() !== req.user.toString()) {
    return next(new ErroHandler("You are not allowed to add members", 403));
  }

  //all promise pending
  const allNewMembersPromise = members.map((m) => User.findById(m, "name"));

  //resolved
  const allNewMembers = await Promise.all(allNewMembersPromise);

  const uniqueMembers = allNewMembers
    .filter((i) => !chat.members.includes(i._id.toString()))
    .map((i) => i._id);

  chat.members.push(...uniqueMembers);

  if (chat.members.length > 100) {
    return next(new ErroHandler("Group members limit reached", 400));
  }

  await chat.save();

  const allUsersName = allNewMembers.map((i) => i.name).join(",");

  emitEvent(
    req,
    ALERT,
    chat.members,
    `${allUsersName} has been added to ${chat.name} group`
  );

  emitEvent(req, REFETCH_CHATS, chat.members);

  return res.status(200).json({
    success: true,
    message: "Members added successfully",
  });
});

const removeMember = TryCatch(async (req, res, next) => {
  const { userId, chatId } = req.body;
  const [chat, userThatWillBeRemoved] = await Promise.all([
    Chat.findById(chatId),
    User.findById(userId, "name"),
  ]);

  if (!chat) {
    return next(new ErroHandler("Chat not found", 404));
  }

  if (!chat.groupChat) {
    return next(new ErroHandler("This is not a group chat", 400));
  }

  if (chat.creator.toString() !== req.user.toString()) {
    return next(new ErroHandler("You are not allowed to add members", 403));
  }

  if (!userId) {
    return next(
      new ErroHandler(
        "Please provide at least a user to remove from the group",
        400
      )
    );
  }

  if (chat.members.length <= 3) {
    return next(new ErroHandler("Group must have at least 3 members", 400));
  }

  chat.members = chat.members.filter((i) => i.toString() !== userId.toString());

  await chat.save();

  emitEvent(
    req,
    ALERT,
    chat.members,
    `${userThatWillBeRemoved} has been removed from the group`
  );

  emitEvent(req, REFETCH_CHATS, chat.members);

  return res.status(200).json({
    success: true,
    message: "Member removed successfully",
  });
});

const leaveGroup = TryCatch(async (req, res, next) => {
  const chatId = req.params.id;

  const chat = await Chat.findById(chatId);

  if (!chat) {
    return next(new ErroHandler("Chat not found", 404));
  }

  if (!chat.groupChat) {
    return next(new ErroHandler("This is not a group chat", 400));
  }
  const userPrasentOrNot = chat.members.find((member) => member === req.user);
  if (!userPrasentOrNot) {
    return next(new ErroHandler("You are not present in the group", 400));
  }

  const remainingMember = chat.members.filter(
    (member) => member.toString() !== req.user.toString()
  );

  if (remainingMember.length < 3) {
    return next(new ErroHandler("Group must have atleast 3 member", 400));
  }

  if (chat.creator.toString() === req.user.toString()) {
    chat.creator = remainingMember ? remainingMember[0] : chat.creator;
  }

  chat.members = remainingMember;

  await chat.save();

  const user = await User.findById(req.user, "name");

  emitEvent(req, ALERT, chat.members, `User ${user.name} has left the group`);

  return res.status(200).json({
    success: true,
    message: "User left the group successfully",
  });
});

const sendAttachments = TryCatch(async (req, res, next) => {
  const { chatId } = req.body;
  const chat = await Chat.findById(chatId);
  const user = await User.findById(req.user, "name");

  if (!chat) {
    return next(new ErroHandler("Chat not found", 404));
  }

  const files = req.files || [];

  if (!files || files.length === 0) {
    return next(new ErroHandler("Please provide attachments", 400));
  }

  const attachments = [];

  const messageForDB = {
    content: "",
    attachments,
    sender: user._id,
    chat: chatId,
  };

  const messageForRealTime = {
    ...messageForDB,
    sender: {
      _id: user._id,
      name: user.name,
    },
  };

  const message = await Message.create(messageForDB);

  emitEvent(req, NEW_ATTACHMENT, chat.members, {
    message: messageForRealTime,
    chatId,
  });

  emitEvent(req, NEW_MESSAGE_ALERT, chat.members, { chatId });

  return res.status(200).json({
    success: true,
    message,
  });
});

const getChatDetails = TryCatch(async (req, res, next) => {
  if (req.query.populate === "true") {
    const chat = await Chat.findById(req.params.id).populate(
      "members",
      "name avatar"
    ).lean();

    if (!chat) {
      return next(new ErroHandler("Chat not found", 404));
    }

    chat.members = chat.members.map(({ _id, name, avatar }) => ({
      _id,
      name,
      avatar: avatar.url,
    }));

    return res.status(200).json({
      success: true,
      chat,
    });
  } else {
    const chat = await Chat.findById(req.params.id);
    if (!chat) {
      return next(new ErroHandler("Chat not found", 404));
    }
    return res.status(200).json({
      success: true,
      chat,
    });
  }
});

const renameGroup = TryCatch( async(req,res,next)=>{
  const chat = await Chat.findById(req.params.id);
  const {name}= req.body;
  if (!chat) {
    return next(new ErroHandler("Chat not found", 404));
  }
  if(!chat.groupChat){
    return next(new ErroHandler("This is not a group chat",400));
  }
  if(chat.creator.toString() !== req.user.toString()){
    return next(new ErroHandler("You are not allowed to rename the group",400));
  }
  
  if(name ===""){
    return next(new ErroHandler("Please provide a name",400));
  }
  chat.name = name;
  await chat.save();
  emitEvent(req,REFETCH_CHATS,chat.members);

  return res.status(200).json({
    success:true,
    message:"Group renamed successfully",
  })
});

const deleteChat = TryCatch(async ( req,res,next)=>{
  const chatId = req.params.id;
  const chat = await Chat.findById(req.params.id);
  
  if (!chat) { return next(new ErroHandler("Chat not found", 404))}
  if(!chat.groupChat){
    return next(new ErroHandler("This is not a group chat",400));
  }
  if(!chat.groupChat && !chat.members.includes(req.user.toString())){
    return next(new ErroHandler("You are not allowed to delete chat",400));
  }
  if(chat.creator.toString()!== req.user.toString()){
    return next(new ErroHandler("You are not allowed to delete the group"));
  }
  const members=chat.members;
  //here we have to delete all chats and attachments from cloudinary
  const messagesWithAttachments = await Message.find({chat:chatId,
  
  attachments:{$exists:true,$ne:[]},
  
  });

  const public_ids = [];
  messagesWithAttachments.forEach(({attachments})=>
    attachments.forEach(({public_id})=>
      public_ids.push(public_id)
    )
  );

  await Promise.all([
    //Delete files from cloudinary
    deleteFilesFromCloudinary(public_ids),
    chat.deleteOne(),
    Message.deleteMany({chat:chatId})
  ])

  emitEvent(req,REFETCH_CHATS,members);
  return res.status(200).json({
    success:true,
    message:"Chat deleted successfully",
  })
})

const getMessages = TryCatch(async(req,res,next)=>{

  const chatId = req.params.id;
  const {page = 1} = req.query;
  const resultPerPage = 20;
  const skip = (page -1 ) * resultPerPage;
  const [messages,totalMessagesCount] = await Promise.all([Message.find({chat:chatId})
    .sort({createdAt:-1})
    .skip(skip)
    .limit(resultPerPage)
    .populate("sender","name")
    .lean(),Message.countDocuments({chat:chatId})]);
    const totalPages = Math.ceil(totalMessagesCount / resultPerPage) || 0;

    return res.status(200).json({
      success:true,
      messages:messages.reverse(),
      totalPages
    })

})






export {
  newGroupChat,
  getMyChats,
  getMyGroups,
  addMembers,
  removeMember,
  leaveGroup,
  sendAttachments,
  getChatDetails,
  renameGroup,
  deleteChat,
  getMessages
};
