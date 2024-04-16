import express from "express";
import { connectDB } from "./utils/features.js";
import dotenv from 'dotenv'
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routers.js";
import chatRouter from "./routes/chat.routers.js";


dotenv.config({
  path:"./.env",
})

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 3000;

connectDB(MONGO_URI);


const app = express();

//Middlewares
app.use(express.json());
app.use(cookieParser());

app.use("/user", userRouter);

app.use("/chat",chatRouter);


app.get("/", (req, res) => {
  res.send("Home route");
});

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
