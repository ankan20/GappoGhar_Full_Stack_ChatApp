import { Box, Stack, Typography } from '@mui/material'
import React, { memo } from 'react'
import oopsImg from "../../assets/oops_img.png"
import {Link} from "../../components/styles/StyledComponents"
import AvatarCard from "../../components/shared/AvatarCard"
import { purple } from '../../constants/color'
const GroupList = ({w="100%" ,groups = [] ,chatId}) => {
    
  return (
    <Stack width={w} >
        {
            groups.length > 0 ? groups.map((group)=><GroupListItem group={group} chatId={chatId} key={group._id}/>):<Box>
                <Typography textAlign={"center"} padding={"1rem"}>No groups</Typography>
                <img src={oopsImg} alt="oops" width={"100%"}/>
            </Box>
        }
    </Stack>
  )
}

const GroupListItem = memo(({group,chatId})=>{

    const {name,avatar,_id} = group;
    return (
        <Link to={`?group=${_id}`} onClick={(e)=>{
            if(chatId=== _id){
                e.preventDefault()
            }
        }}>
        
            <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
                <AvatarCard avatar={avatar}/>
                <Typography>{name}</Typography>
            </Stack>
        
        </Link>
    )
});

export default GroupList
