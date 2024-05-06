import express from "express";
import { connectDB } from "./utils/features.js";
import dotenv from "dotenv";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import { Server } from "socket.io";
import { v4 as uuid } from "uuid";

import userRouter from "./routes/user.routers.js";
import chatRouter from "./routes/chat.routers.js";
import adminRouter from "./routes/admin.routers.js";
import { NEW_MESSAGE, NEW_MESSAGE_ALERT } from "./constants/events.js";
import { getSockets } from "./lib/helper.js";
import { Message } from "./models/message.js";

dotenv.config({
  path: "./.env",
});

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 3000;
const envMode = process.env.NODE_ENV.trim() || "PRODUCTION";
const userSocketIDs = new Map();

connectDB(MONGO_URI);

const app = express();
const server = createServer(app);
const io = new Server(server, {});

//Middlewares
app.use(express.json());
app.use(cookieParser());

app.use("/user", userRouter);

app.use("/chat", chatRouter);

app.use("/admin", adminRouter);

io.use((socket, next) => {});

io.on("connection", (socket) => {
  const user = {
    _id: uuid(),
    name: "ankan op",
  };
  userSocketIDs.set(user._id.toString(), socket.id);

  console.log("A user connected:", socket.id);

  socket.on(NEW_MESSAGE, async ({ chatId, members, message }) => {
    const messageForRealTime = {
      content: message,
      _id: uuid(),
      sender: {
        _id: user._id,
        name: user.name,
      },
      chat: chatId,
      createdAt: new Date().toISOString(),
    };

    const messageForDB = {
      content: message,
      sender: user._id,
      chat: chatId,
    };

    const membersSocket = getSockets(members);

    io.to(membersSocket).emit(NEW_MESSAGE, {
      chatId,
      message: messageForRealTime,
    });
    io.to(membersSocket).emit(NEW_MESSAGE_ALERT, { chatId });
    try {
      await Message.create(messageForDB);
    } catch (error) {
      console.log(error);
    }
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    userSocketIDs.delete(user._id.toString());

    console.log("User disconnected:", socket.id);
  });
});

app.get("/", (req, res) => {
  res.send("Home route");
});

app.use(errorMiddleware);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} in ${envMode} Mode`);
});

export { envMode, userSocketIDs };
