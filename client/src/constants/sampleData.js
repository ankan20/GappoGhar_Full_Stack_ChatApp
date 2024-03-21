export const sampleChats = [
  {
    avatar: ["https://avatar.iran.liara.run/public/49"],
    name: "John Doe",
    _id: "1",
    groupChat: false,
    members: ["1", "2"],
  },

  {
    avatar: [
      "https://cdni.iconscout.com/illustration/premium/thumb/woman-profile-8187680-6590622.png?f=webp",
    ],
    name: "John Doe 2",
    _id: "2",
    groupChat: true,
    members: ["1", "2"],
  },
  
];

export const sampleUsers = [
  {
    avatar: "https://avatar.iran.liara.run/public/49",
    name: "John Doe",
    _id: "1",
  },
  {
    avatar:
      "https://cdni.iconscout.com/illustration/premium/thumb/woman-profile-8187680-6590622.png?f=webp",
    name: "John Doe 2",
    _id: "2",
  },
  
];

export const sampleNotification = [
  {
    sender: {
      avatar: "https://avatar.iran.liara.run/public/49",
      name: "John Doe",
    },
    _id: "1",
  },
  {
    sender: {
      avatar:
        "https://cdni.iconscout.com/illustration/premium/thumb/woman-profile-8187680-6590622.png?f=webp",
      name: "John Doe 2",
    },
    _id: "2",
  },
];

export const sampleMessage = [
  {
    attachments: [
      {
        publick_id: "aasaas",
        url: "https://cdn-icons-png.flaticon.com/512/29/29264.png",
      },
    ],
    content: "",
    _id: "asasddsdasddasd",
    sender: {
      _id: "ddfewfrwfqefewf",
      name: "Ankan",
    },
    chat: "chatId",
    createdAt: "2024-02-12T10:41:30.630Z",
  },
  {
    attachments: [],
    content: "kuch bhi vej ta he2",
    _id: "asasddsdasddasdcvcb",
    sender: {
      _id: "ddfewfrwfqefewfaghgha",
      name: "Ankan 2",
    },
    chat: "chatId",
    createdAt: "2024-02-12T10:41:30.630Z",
  },
];


export const dashboardData = {
  users:[
    {
      name:"John Doe",
      avatar:"https://cdni.iconscout.com/illustration/premium/thumb/woman-profile-8187680-6590622.png?f=webp",
      _id:"1",
      username:"john_doe",
      friends:20,
      groups:5,
    },
    {
      name:"John Doe",
      avatar:"https://cdni.iconscout.com/illustration/premium/thumb/woman-profile-8187680-6590622.png?f=webp",
      _id:"2",
      username:"john_doe",
      friends:22,
      groups:12,
    },
  ],
  chats:[
    {
      name:"hatir matha group",
      avatar:["https://cdni.iconscout.com/illustration/premium/thumb/woman-profile-8187680-6590622.png?f=webp"],
      _id:"1",
      groupChat:false,
      members:[{_id:"1",avatar:"https://cdni.iconscout.com/illustration/premium/thumb/woman-profile-8187680-6590622.png?f=webp"},{_id:"2",avatar:"https://cdni.iconscout.com/illustration/premium/thumb/woman-profile-8187680-6590622.png?f=webp"}],
      totalMembers:2,
      totalMessages:20,
      creator:{
        name:"John Doe",
        avatar:"https://cdni.iconscout.com/illustration/premium/thumb/woman-profile-8187680-6590622.png?f=webp"
      },
    },
    {
      name:"L*da lasan group",
      avatar:["https://cdni.iconscout.com/illustration/premium/thumb/woman-profile-8187680-6590622.png?f=webp"],
      _id:"2",
      groupChat:false,
      members:[{_id:"1",avatar:"https://cdni.iconscout.com/illustration/premium/thumb/woman-profile-8187680-6590622.png?f=webp"},{_id:"2",avatar:"https://cdni.iconscout.com/illustration/premium/thumb/woman-profile-8187680-6590622.png?f=webp"}],
      totalMembers:2,
      totalMessages:20,
      creator:{
        name:"John Doe",
        avatar:"https://cdni.iconscout.com/illustration/premium/thumb/woman-profile-8187680-6590622.png?f=webp"
      },
    }
  ],
  messages : [
    {
      attachments:[],
      content:"l*da ke message",
      _id:"11",
      sender:{
        avatar:"https://cdni.iconscout.com/illustration/premium/thumb/woman-profile-8187680-6590622.png?f=webp",
        name:"Chaman",
      },
      chat:"chatId",
      groupChat:false,
      createdAt:"2024-02-12T10:41:30.630Z"
    },
    {
      attachments:[
        {
          publick_id:"asssss 2",
          url:"https://cdn-icons-png.flaticon.com/512/29/29264.png"
        }
      ],
      content:"l*da ke message",
      _id:"111",
      sender:{
        avatar:"https://cdni.iconscout.com/illustration/premium/thumb/woman-profile-8187680-6590622.png?f=webp",
        name:"Chaman 2",
      },
      chat:"chatId",
      groupChat:true,
      createdAt:"2024-02-12T10:41:30.630Z"
    }
  ]
};

