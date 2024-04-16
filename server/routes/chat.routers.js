import express from 'express';
import { isAuthenticated } from '../middlewares/auth.js';
import { getMyChats, getMyGroups, newGroupChat } from '../constrollers/chat.controllers.js';
const router = express.Router();


//User must be logged in to access this routes
router.use(isAuthenticated);

router.post("/new",newGroupChat);

router.get("/mychats",getMyChats);

router.get("/my/groups",getMyGroups);

export default router;