import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const cookieOptions = {
  maxAge:15 * 24 *60 *60 *1000,
  sameSite:"none",
  httpOnly:true,
  secure:true,
};

const connectDB = (url) => {
  mongoose
    .connect(url, { dbName: "gappoghar" })
    .then(() => {
      console.log("Connected to DataBase");
    })
    .catch((err) => {
     throw err;
    });
};

const sendToken = (res,user,code,message)=>{

  const token = jwt.sign({_id:user._id},process.env.JWT_SECRET);
  return res.status(code).cookie("login-token",token,cookieOptions).json({
    success: true,
    message,
  })

}

const emitEvent = (req,event,users,data)=>{
  console.log("Emiting event",event);
}


export {connectDB ,sendToken ,cookieOptions,emitEvent}
