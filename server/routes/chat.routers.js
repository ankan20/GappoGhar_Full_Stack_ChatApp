import express from 'express';
import { isAuthenticated } from '../middlewares/auth.js';
import { addMembers, deleteChat, getChatDetails, getMessages, getMyChats, getMyGroups, leaveGroup, newGroupChat, removeMember, renameGroup, sendAttachments } from '../constrollers/chat.controllers.js';
import { attachmentsMulter } from '../middlewares/multer.js';
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
router.post("/message",attachmentsMulter,sendAttachments);

//Get Messages
router.get("/message/:id",getMessages);

//Get Chat Details , rename , delete
router.route('/:id').get(getChatDetails).put(renameGroup).delete(deleteChat);

export default router;