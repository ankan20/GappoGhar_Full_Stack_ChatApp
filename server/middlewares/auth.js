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

const isAuthenticatedAdmin = (req, res,next) => {

    const token = req.cookies["admin-token"];

    if(!token){
        return next(new ErroHandler("Please login with admin secret key to access this route",401));
    }

    const decodedData = jwt.verify(token,process.env.JWT_SECRET);

    if(decodedData !==process.env.ADMIN_SECRET_KEY){
        return next(new ErroHandler("Please login with admin secret key to access this route",401));
    }

    next();
};

export {isAuthenticated ,isAuthenticatedAdmin};


