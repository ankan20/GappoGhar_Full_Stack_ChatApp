import { Button, Dialog, DialogTitle, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import {sampleUsers} from '../../constants/sampleData'
import UserItem from '../shared/UserItem'
const AddMemberDialog = ({addMember , isLoadingAddMember ,chatId}) => {

    const [members, setMembers] = useState(sampleUsers);
    const [selectedMembers, setSelectedMembers] = useState([]);
  
  
    const selectMemberHandler = (id) => {
      setSelectedMembers((prev) =>
        prev.includes(id)
          ? prev.filter((currElement) => id !== currElement)
          : [...prev, id]
      );
    };

   
    const addMemberSubmitHandler = ()=>{
        closeHandler();
    }

    const closeHandler =()=>{
        setSelectedMembers([]);
        setMembers([]);
    }
  return (
    <Dialog open onClose={closeHandler}>
        <Stack p={"2rem"} width={"20rem"} spacing={"2rem"} bgcolor={"whitesmoke"}>
            <DialogTitle textAlign={"center"}>Add Member</DialogTitle>
            <Stack spacing={"1rem"}>
                {   members.length > 0 ?
                    members.map((user)=>
                        <UserItem key={user._id} user={user} handler={selectMemberHandler} isAdded={selectedMembers.includes(user._id)}/>
                    ) : <Typography textAlign={"center"}>No Friends</Typography>
                    
                }
            </Stack>
            <Stack direction={"row"} justifyContent={"space-evenly"} alignItems={'center'}>
            <Button color='error' onClick={closeHandler}>Cancel</Button>
            <Button variant='contained' disabled={isLoadingAddMember} onClick={addMemberSubmitHandler}>Submit Changes</Button>
            </Stack>
        </Stack>
    </Dialog>
  )
}

export default AddMemberDialog
