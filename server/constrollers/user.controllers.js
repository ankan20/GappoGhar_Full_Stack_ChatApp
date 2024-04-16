import { compare } from "bcrypt";
import { User } from "../models/user.js";
import { cookieOptions, sendToken } from "../utils/features.js";
import { TryCatch } from "../middlewares/error.js";
import { ErroHandler } from "../utils/utility.js";

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
    return next(new ErroHandler("Invalid Username or Password",404));
  }

  const isMatch = await compare(password, user.password);

  if (!isMatch) {
    return next(new ErroHandler("Invalid Username or Password",404));
  }
  
  sendToken(res, user, 201, `Welcome back ${user.name}`);
});

const getMyProfile = TryCatch(async (req, res) => {

    const user = await User.findById(req.user);

    res.status(200).json({
        success:true,
        user,
    });
});

const logout = TryCatch(async (req, res) => {

    return res.status(200).cookie("login-token","",{...cookieOptions,maxAge:0}).json({
        success:true,
        message:"Logged out successfully",
    });
});


const searchUser = TryCatch(async (req, res) => {

    const {name} = req.query;

    return res.status(200).json({
        success:true,
        message:name,
    });
});


export { login, newUser, getMyProfile ,logout , searchUser};
