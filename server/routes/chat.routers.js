import express from 'express';
import { isAuthenticated } from '../middlewares/auth.js';
import { addMembers, deleteChat, getChatDetails, getMessages, getMyChats, getMyGroups, leaveGroup, newGroupChat, removeMember, renameGroup, sendAttachments } from '../constrollers/chat.controllers.js';
import { attachmentsMulter } from '../middlewares/multer.js';
import { addMembersValidator, chatIdValidator, newGroupChatValidator, removeMemberValidator, renameGroupValidator, sendAttachmentValidator, validateHandler } from '../lib/validators.js';
const router = express.Router();


//User must be logged in to access this routes
router.use(isAuthenticated);

router.post("/new",newGroupChatValidator(),validateHandler,newGroupChat);

router.get("/mychats",getMyChats);

router.get("/my/groups",getMyGroups);

router.put("/addmembers",addMembersValidator(),validateHandler,addMembers);

router.put("/removemember",removeMemberValidator(),validateHandler,removeMember);

router.delete("/leave/:id",chatIdValidator(),validateHandler,leaveGroup)

//send attachments
router.post("/message",attachmentsMulter,sendAttachmentValidator(),validateHandler,sendAttachments);

//Get Messages
router.get("/message/:id",chatIdValidator(),validateHandler,getMessages);

//Get Chat Details , rename , delete
router.route('/:id').get(chatIdValidator(),validateHandler,getChatDetails).put(renameGroupValidator(),validateHandler,renameGroup).delete(chatIdValidator(),validateHandler,deleteChat);

export default router;