import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import React, { memo } from 'react'
import { sampleNotification } from "../../constants/sampleData";


const Notifications = () => {

  const friendRequestHandler =(_id,accept)=>{

  }
  return (
   <Dialog open>
    <Stack p={{xs:"1rem" ,sm:"2rem"}} maxWidth={"25rem"} sx={{bgcolor:"rgba(225,225,225,0.9)"}}>
      <DialogTitle>Notifications</DialogTitle>
      {
        sampleNotification.length > 0 ?
        (

          sampleNotification.map(({sender,_id})=><NotificationItem sender={sender} _id={_id} handler={friendRequestHandler} key={_id} />)


        ):<Typography textAlign={"center"}>No notifications</Typography>
      }
    </Stack>
   </Dialog>
  )
};

const NotificationItem = memo(({sender,_id,handler})=>{
  const {name ,avatar} =sender;
  return (
    <ListItem
   
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        width={"100%"}
      >
        <Avatar />
        <Typography 
        variant="body1"
        sx={{
            flexGrow:1,
            display:"-webkit-box",
            WebkitLineClamp:1,
            WebkitBoxOrient:"vertical",
            overflow:"hidden",
            textOverflow:"ellipsis",
            width:"100%",
            
        }}
        
        >{`${name} sent you a friend request`}</Typography>
        <Stack direction={{
          xs:"column",
          sm:"row"
        }}>
          <Button onClick={()=>handler({_id,accept:true})} color="success">Accept</Button>
          <Button onClick={()=>handler({_id,accept:false})} color="error">Reject</Button>
        </Stack>
      </Stack>
    </ListItem>
  );
})

export default Notifications
