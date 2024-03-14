import {
  Dialog,
  DialogTitle,
  InputAdornment,
  List,
  Stack,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useInputValidation } from "6pp";
import { Search as SearchIcon } from "@mui/icons-material";
import UserItem from "../shared/UserItem";
import { sampleUsers } from "../../constants/sampleData";
import { purple } from "../../constants/color";


let isLoadingSendFriendRequest = false;

const Search = () => {

  const addFriendHandler =(id)=>{
    console.log("addFriendHandler",id)
  }
  const [users,setUsers] = useState(sampleUsers)


  const search = useInputValidation("");
  return (
    <Dialog open >
      <Stack p={"2rem"} direction={"column"} width={"25rem"} sx={{bgcolor:purple,color:"white"}}>
        <DialogTitle textAlign={"center"}>Find People</DialogTitle>
        <TextField
          label=""
          value={search.value}
          onChange={search.changeHandler}
          variant="outlined"
          size="small"
          
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <List>
          
          {
            
            users.map((user)=>(
             <UserItem user={user} key={user._id} handler={addFriendHandler} handlerIsLoading={isLoadingSendFriendRequest}/>
            ))
          }
        </List>
      </Stack>
    </Dialog>
  );
};

export default Search;
