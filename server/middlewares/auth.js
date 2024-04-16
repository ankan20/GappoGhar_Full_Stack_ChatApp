import { ErroHandler } from "../utils/utility.js";
import jwt from "jsonwebtoken";

const isAuthenticated = (req, res,next) => {

    const token = req.cookies["login-token"];

    if(!token){
        return next(new ErroHandler("Please login to access this route",401));
    }

    const decodedData = jwt.verify(token,process.env.JWT_SECRET);

    req.user = decodedData._id;

    next();
};

export {isAuthenticated};


