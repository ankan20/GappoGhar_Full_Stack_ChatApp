import express from 'express';
import { acceptRequest, getAllNotifications, getMyFriends, getMyProfile, login, logout, newUser ,searchUser, sendRequest } from '../constrollers/user.controllers.js';
import { singleAvatar } from '../middlewares/multer.js'
import { isAuthenticated } from '../middlewares/auth.js';
import { acceptFriendRequestValidator, loginValidator, registerValidator, sendFriendRequestValidator, validateHandler } from '../lib/validators.js';
const router = express.Router();

router.post('/new',singleAvatar,registerValidator(),validateHandler,newUser);
router.post('/login',loginValidator(),validateHandler,login);

//User must be logged in to access this routes
router.use(isAuthenticated);

router.get("/myprofile", getMyProfile);

router.get("/logout", logout);

router.get("/search",searchUser);

router.put("/sendrequest",sendFriendRequestValidator(),validateHandler,sendRequest);

router.put("/acceptrequest",acceptFriendRequestValidator(),validateHandler,acceptRequest);

router.get("/notifications",getAllNotifications);

router.get("/friends",getMyFriends);

export default router;