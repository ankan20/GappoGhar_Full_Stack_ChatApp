import jwt from "jsonwebtoken";
import { TryCatch } from "../middlewares/error.js";
import { Chat } from "../models/chat.js";
import { Message } from "../models/message.js";
import { User } from "../models/user.js";
import { ErroHandler } from "../utils/utility.js";
import { cookieOptions } from "../utils/features.js";

const adminLogin = TryCatch(async (req, res, next) => {
  const { secretkey } = req.body;
  const adminsecretkey = process.env.ADMIN_SECRET_KEY || "ankanadmin";
  const isMatch = secretkey === adminsecretkey;
  if (!isMatch) {
    return next(
      new ErroHandler("Please provide currect admin secret key", 401)
    );
  }
  const token = jwt.sign(secretkey, process.env.JWT_SECRET);

  return res
    .status(200)
    .cookie("admin-token", token, { ...cookieOptions, maxAge: 1000 * 60 * 15 })
    .json({
      success: true,
      message: "Admin Authenticated Successfully ,Wellcome Ankan !",
    });
});

const adminLogout = TryCatch(async (req, res, next) => {
  return res
    .status(200)
    .cookie("admin-token", "", { ...cookieOptions, maxAge: 0 })
    .json({
      success: true,
      message: "Admin logged out Successfully !",
    });
});

const getAdminData = TryCatch(async (req,res,next)=>{
    return res.status(200).json({
        admin:true,
    })
})

const allUsers = TryCatch(async (req, res) => {
  const users = await User.find({});

  const transformedUsers = await Promise.all(
    users.map(async ({ name, username, avatar, _id }) => {
      const [groups, friends] = await Promise.all([
        Chat.countDocuments({ groupChat: true, members: _id }),
        Chat.countDocuments({ groupChat: false, members: _id }),
      ]);
      return {
        name,
        username,
        avatar: avatar.url,
        _id,
        groups,
        friends,
      };
    })
  );

  res.status(200).json({ success: true, users: transformedUsers });
});

const allChats = TryCatch(async (req, res) => {
  const chats = await Chat.find({})
    .populate("members", "name avatar")
    .populate("creator", "name avatar");

  const transformedChats = await Promise.all(
    chats.map(async ({ members, _id, groupChat, name, creator }) => {
      const totalMessages = await Message.countDocuments({ chat: _id });

      return {
        _id,
        groupChat,
        name,
        avatar: members.slice(0, 3).map((member) => member.avatar.url),
        members: members.map(({ _id, name, avatar }) => {
          return {
            _id,
            name,
            avatar: avatar.url,
          };
        }),
        creator: {
          name: creator?.name || "None",
          avatar: creator?.avatar.url || "",
        },
        totalMembers: members.length,
        totalMessages,
      };
    })
  );

  res.status(200).json({ success: true, chats: transformedChats });
});

const allMessages = TryCatch(async (req, res) => {
  const messages = await Message.find({})
    .populate("sender", "name avatar")
    .populate("chat", "groupChat");

  const transformedMessages = messages.map(
    ({ content, attachments, _id, sender, createdAt, chat }) => ({
      content,
      attachments,
      _id,
      createdAt,
      chat: chat._id,
      groupChat: chat.groupChat,
      sender: {
        _id: sender._id,
        avatar: sender.avatar.url,
        name: sender.name,
      },
    })
  );

  res.status(200).json({ success: true, messages: transformedMessages });
});

const getDashboardStats = TryCatch(async (req, res) => {
  const [groupsCount, usersCount, messagesCount, totalChatsCount] =
    await Promise.all([
      Chat.countDocuments({ groupChat: true }),
      User.countDocuments(),
      Message.countDocuments(),
      Chat.countDocuments(),
    ]);

  const today = new Date();
  const last7Days = new Date();
  last7Days.setDate(last7Days.getDate() - 7);
  const last7DaysMessages = await Message.find({
    createdAt: {
      $gte: last7Days,
      $lte: today,
    },
  }).select("createdAt");
  const messages = new Array(7).fill(0);
  const dayInMiliSec = 1000 * 60 * 60 * 24;

  last7DaysMessages.forEach((message) => {
    const indexApprox =
      (today.getTime() - message.createdAt.getTime()) / dayInMiliSec;
    const index = Math.floor(indexApprox);
    messages[6 - index]++;
  });

  const stats = {
    groupsCount,
    usersCount,
    messagesCount,
    totalChatsCount,
    messagesChart: messages,
  };
  return res.status(200).json({
    success: true,
    stats,
  });
});

export { allUsers, allChats, allMessages, getDashboardStats, adminLogin ,adminLogout ,getAdminData};
