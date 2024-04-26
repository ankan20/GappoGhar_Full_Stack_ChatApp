import { compare } from "bcrypt";
import { User } from "../models/user.js";
import { cookieOptions, emitEvent, sendToken } from "../utils/features.js";
import { TryCatch } from "../middlewares/error.js";
import { ErroHandler } from "../utils/utility.js";
import { Chat } from "../models/chat.js";
import {Request} from '../models/request.js';
import { NEW_REQUEST, REFETCH_CHATS } from "../constants/events.js";

//Create a new user and save it to database and save token in cookie
const newUser = async (req, res) => {
  const { name, username, password, bio } = req.body;

  const avatar = {
    public_id: "sdddffe",
    url: "absndb",
  };
  const user = await User.create({
    name,
    bio,
    username,
    password,
    avatar,
  });

  sendToken(res, user, 201, "User created");
};

//Login a existing user  and save token in cookie
const login = TryCatch(async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username }).select("+password");

  if (!user) {
    return next(new ErroHandler("Invalid Username or Password", 404));
  }

  const isMatch = await compare(password, user.password);

  if (!isMatch) {
    return next(new ErroHandler("Invalid Username or Password", 404));
  }

  sendToken(res, user, 201, `Welcome back ${user.name}`);
});

const getMyProfile = TryCatch(async (req, res) => {
  const user = await User.findById(req.user);

  res.status(200).json({
    success: true,
    user,
  });
});

const logout = TryCatch(async (req, res) => {
  return res
    .status(200)
    .cookie("login-token", "", { ...cookieOptions, maxAge: 0 })
    .json({
      success: true,
      message: "Logged out successfully",
    });
});

const searchUser = TryCatch(async (req, res) => {
  const { name = "" } = req.query;

  //Finding all my chats
  const myChats = await Chat.find({
    groupChat: false,
    members: { $in: [req.user] },
  });

  //all users from my chat means my friends or people I have chatted with
  const allUsersFromMyChats = myChats.map((chat) => chat.members).flat();

  const allUserExceptMe = await User.find({
    _id: { $nin: allUsersFromMyChats },
    //for finding pattern wise name --->ank > ankan
    name: { $regex: name, $options: "i" },
  });

  const users = allUserExceptMe.map(({ _id, name, avatar }) => ({
    _id,
    name,
    avatar: avatar.url,
  }));

  return res.status(200).json({
    success: true,
    users,
  });
});

const sendRequest = TryCatch(async (req, res) => {
  const {userId} = req.body;
  const request = await Request.findOne({
    $or:[
      {sender:req.user ,receiver:userId},
      {sender:userId,receiver:req.user}
    ]
  })
  if(request) return next(new ErroHandler("Request already sent",400));

  await Request.create({
    sender:req.user,
    receiver:userId
  })

  emitEvent(req,NEW_REQUEST,[userId]);

  return res
    .status(200)
    .json({
      success: true,
      message: "Friend request sent",
    });
});

const acceptRequest = TryCatch(async (req, res) => {

  const {requestId,accept}= req.body;
  const request = await Request.findById(requestId).populate("sender","name").populate("receiver","name");

  if(!request) return next(new ErroHandler("Request not found",400));

  if(request.receiver.toString() !== req.user.toString()){
    return next(new ErroHandler("You are not authorized to accept this request",401));
  }
  const members = [request.sender._id,request.receiver._id];
  if(accept){   
    await Promiseall([Chat.create({members,name:`${request.sender.name} - ${request.receiver.name}`}),request.deleteOne()])
  }
  else {
    await request.deleteOne();
    return res.status(200).json({
      success:true,
      message:"Friend Request Rejected"
    })
  }

  emitEvent(req,REFETCH_CHATS,members)
    
  

  return res
    .status(200)
    .json({
      success: true,
      message: "Friend Request Accepted",
      senderId:request.sender._id
    });
});

export { login, newUser, getMyProfile, logout, searchUser ,sendRequest,acceptRequest};
