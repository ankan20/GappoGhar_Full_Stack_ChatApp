import {
  Avatar,
  IconButton,
  ListItem,
  Stack,
  Typography,
  
} from "@mui/material";
import {Add as AddIcon, Remove as RemoveIcon} from '@mui/icons-material'
import React, { memo } from "react";
import { btnNavy, btnRed, darkBtnNavy, darkBtnRed} from "../../constants/color";

const UserItem = ({ user, handler, handlerIsLoading ,isAdded=false ,styling={}} ) => {
  const { name, _id, avatar } = user;

  return (
    <ListItem 
   
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        width={"100%"}
        {...styling}
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
        
        >{name}</Typography>
        <IconButton onClick={() => handler(_id)} disabled={handlerIsLoading}
        
        sx={{
            bgcolor:isAdded ? btnRed: btnNavy,
            color:'white',
            "&:hover":{
                bgcolor: isAdded ? darkBtnRed: darkBtnNavy
            }
        }}
        
        >

          {
            isAdded ? <RemoveIcon/> :<AddIcon />
          }

          
        </IconButton>
      </Stack>
    </ListItem>
  );
};

export default memo(UserItem);
