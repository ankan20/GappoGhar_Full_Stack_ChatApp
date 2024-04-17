import express from 'express';
import { isAuthenticated } from '../middlewares/auth.js';
import { addMembers, getMyChats, getMyGroups, leaveGroup, newGroupChat, removeMember } from '../constrollers/chat.controllers.js';
const router = express.Router();


//User must be logged in to access this routes
router.use(isAuthenticated);

router.post("/new",newGroupChat);

router.get("/mychats",getMyChats);

router.get("/my/groups",getMyGroups);

router.put("/addmembers",addMembers);

router.put("/removemember",removeMember);

router.delete("/leave/:id",leaveGroup)

//send attachments

//Get Messages

//Get Chat Details , rename , delete

export default router;