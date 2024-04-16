import express from 'express';
import { getMyProfile, login, logout, newUser ,searchUser } from '../constrollers/user.controllers.js';
import { singleAvatar } from '../middlewares/multer.js'
import { isAuthenticated } from '../middlewares/auth.js';
const router = express.Router();

router.post('/new',singleAvatar,newUser);
router.post('/login',login);

//User must be logged in to access this routes
router.use(isAuthenticated);

router.get("/myprofile", getMyProfile);

router.get("/logout", logout);

router.get("/search",searchUser);

export default router;