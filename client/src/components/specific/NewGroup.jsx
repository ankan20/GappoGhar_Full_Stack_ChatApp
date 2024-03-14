import React, { useState } from 'react'
import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  ListItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {sampleUsers} from '../../constants/sampleData'
import UserItem from '../shared/UserItem';
import { useInputValidation } from '6pp';
const NewGroup = () => {

  const [members,setMembers] = useState(sampleUsers);
  const [selectedMembers,setSelectedMembers] = useState([])

  const groupName = useInputValidation("")

  const submitHandler = ()=>{

  }


  const selectMemberHandler =(id)=>{
    setSelectedMembers(prev=>(prev.includes(id)?prev.filter((currElement)=>id !== currElement):[...prev,id]));
    
  }

  const closeHandler = ()=>{}


  return (
    <Dialog open onClose={closeHandler}>
    <Stack p={{xs:"1rem" ,sm:"2rem"}} width={"25rem"} sx={{bgcolor:"rgba(225,225,225,0.9)"}} spacing={"2rem"}>
      <DialogTitle textAlign={"center"} variant='h4'>New Group</DialogTitle>
      <TextField label="Group Name" value={groupName.value} onChange={groupName.changeHandler}/>
      <Typography variant='body1'>Members</Typography>
      <Stack>
          
          {
            
            members.map((user)=>(
             <UserItem user={user} key={user._id} handler={selectMemberHandler} isAdded={selectedMembers.includes(user._id)}/>
            ))
          }
        </Stack>

        <Stack direction={"row"} justifyContent={"space-evenly"}> 
        <Button variant='outlined' color='error' size='large'>Cancel</Button>
        <Button variant='contained' size='large' onClick={submitHandler}>Create</Button>
        </Stack>
    </Stack>
   </Dialog>
  )
}

export default NewGroup
