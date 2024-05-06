import {body,validationResult, param} from 'express-validator'
import { ErroHandler } from '../utils/utility.js';


const validateHandler = (req,res,next)=>{
    const errors = validationResult(req);
    const errorMessages = errors.array().map((error)=>error.msg).join(", ");
    if(errors.isEmpty()) return next();
    else next(new ErroHandler(errorMessages,400));
}
const registerValidator =()=>[
    body("name","Please Enter name").notEmpty(),
    body("username","Please Enter username").notEmpty(),
    body("password","Please Enter password").notEmpty(),
    body("bio","Please Enter bio").notEmpty(),
];


const loginValidator =()=>[
    body("username","Please Enter username").notEmpty(),
    body("password","Please Enter password").notEmpty(),
];

const newGroupChatValidator =()=>[
    body("name","Please Enter group name").notEmpty(),
    body("members").notEmpty().withMessage("Please select atleast two members").isArray({min:2,max:100}).withMessage("Members must be an array of 2 or more members"),
]

const addMembersValidator =()=>[
    body("chatId","Please provide chatId").notEmpty(),
    body("members").notEmpty().withMessage("Please select atleast one member").isArray({min:1,max:97}).withMessage("Members must be 1 or more members"),
]

const removeMemberValidator =()=>[
    body("chatId","Please provide chatId").notEmpty(),
    body("userId").notEmpty().withMessage("Please provide userId"),
]



const sendAttachmentValidator = ()=>[
    body("chatId","Please provide chat Id").notEmpty(),
]

const chatIdValidator = ()=>[
    param("id","Please provide chat Id").notEmpty(),
]

const renameGroupValidator = ()=>[
    param("id","Please provide chat Id").notEmpty(),
    body("name","Please provide group name").notEmpty()
]

const sendFriendRequestValidator = ()=>[
    body("userId","Please provide User Id").notEmpty(),
]

const acceptFriendRequestValidator = ()=>[
    body("requestId","Please provide Request Id").notEmpty(),
    body("accept").notEmpty().withMessage("Please Add Accept").isBoolean().withMessage("Accept must be a boolean"),
]

const adminLoginValidator = ()=>[
    body("secretkey","Please provide secretkey").notEmpty(),
]



export {registerValidator,validateHandler,loginValidator,newGroupChatValidator,addMembersValidator,removeMemberValidator,sendAttachmentValidator,chatIdValidator,renameGroupValidator,sendFriendRequestValidator,acceptFriendRequestValidator,adminLoginValidator};
