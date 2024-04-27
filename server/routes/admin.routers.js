import express from 'express';
import { adminLogin, adminLogout, allChats, allMessages, allUsers, getAdminData, getDashboardStats } from '../constrollers/admin.controllers.js';
import { adminLoginValidator, validateHandler } from '../lib/validators.js';
import { isAuthenticatedAdmin } from '../middlewares/auth.js';
const router = express.Router();



router.post("/verify",adminLoginValidator(),validateHandler,adminLogin);

router.use(isAuthenticatedAdmin);
//only admin can access
router.get("/",getAdminData);
router.get("/logout",adminLogout);

router.get("/users",allUsers);

router.get("/chats",allChats);

router.get("/messages",allMessages);

router.get("/stats",getDashboardStats);

export default router;