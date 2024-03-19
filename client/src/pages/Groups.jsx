import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Drawer,
  Grid,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { purple } from "../constants/color";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Done as DoneIcon,
  Edit as EditIcon,
  KeyboardBackspace as KeyboardBackspaceIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { useNavigate, useSearchParams } from "react-router-dom";
import GroupList from "../components/shared/GroupList";
import { sampleChats } from "../constants/sampleData";

const Groups = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupNameUpdatedValue, setGroupNameUpdatedValue] = useState("");
  const chatId = useSearchParams()[0].get("group");

  const navigate = useNavigate();
  const navigateBack = () => {
    navigate("/");
  };
  const handleMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleMobileClose = () => setIsMobileMenuOpen(false);

  const updateGroupName = () => {
    setIsEdit(false);
    console.log("Group name updated");
  };

  const confirmDeleteHandler = ()=>{}
  const openAddMemberHandler = ()=>{}

  useEffect(()=>{
    setGroupName(`Group Name ${chatId}`);
    setGroupNameUpdatedValue(`Group Name ${chatId}`);
    return ()=>{
      setGroupName("");
    setGroupNameUpdatedValue("");
    setIsEdit(false);
    }
  },[chatId])

  const IconBtns = (
    <>
      <Box
        sx={{
          display: {
            xs: "block",
            sm: "none",
            position: "fixed",
            right: "1rem",
            top: "2rem",
          },
        }}
      >
        <Tooltip title="menu">
          <IconButton onClick={handleMenu}>
            <MenuIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <Tooltip title="back">
        <IconButton
          sx={{
            position: "absolute",
            top: "2rem",
            left: "2rem",
            bgcolor: "rgba(0,0,0,0.8)",
            color: "whitesmoke",
            ":hover": {
              bgcolor: "black",
            },
          }}
          onClick={navigateBack}
        >
          <KeyboardBackspaceIcon />
        </IconButton>
      </Tooltip>
    </>
  );

  const GroupName = (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"center"}
      spacing={"1rem"}
      padding={"3rem"}
    >
      {isEdit ? (
        <>
          <TextField
            value={groupNameUpdatedValue}
            onChange={(e) => setGroupNameUpdatedValue(e.target.value)}
          />
          <IconButton onClick={updateGroupName}>
            <DoneIcon />
          </IconButton>
        </>
      ) : (
        <>
          <Typography variant="h4">{groupName}</Typography>
          <IconButton onClick={() => setIsEdit(true)}>
            <EditIcon />
          </IconButton>
        </>
      )}
    </Stack>
  );

  const ButtonGroup = <Stack
  
  direction={{
    sm:"row",
    xs:"column-reverse"
  }}
  spacing={"1rem"}
  p={{
    xs:"0",
    sm:"1rem",
    
    md:"1rem 4rem"
  }}
  
  >
    <Button size="large" color="error" variant="outlined" startIcon={<DeleteIcon/>} onClick={confirmDeleteHandler}>Delete Group</Button>
    <Button size="large" variant="contained" startIcon={<AddIcon/>} onClick={openAddMemberHandler}>Add Member </Button>
  </Stack>

  return (
    <Grid container height={"100vh"}>
      <Grid
        item
        sx={{
          display: {
            xs: "none",
            sm: "block",
          },
        }}
        sm={4}
        bgcolor={purple}
      >
        <GroupList groups={sampleChats} chatId={chatId} />
      </Grid>
      <Grid
        item
        xs={12}
        sm={8}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          padding: "1rem 3rem",
        }}
      >
        {IconBtns}

        {groupName && <>
          
        {GroupName}
        <Typography margin={"2rem"} alignSelf={"flex-start"} variant="body1">Members</Typography>

        <Stack
        
          maxWidth={"45rem"}
          width={"100%"}
          boxSizing={"border-box"}
          padding={{
            sm:"1rem",
            xs:"0",
            md:"1rem 4rem"
          }}
          spacing={"2rem"}
          bgcolor={purple}
          height={"50vh"}
          overflow={"auto"}
        
        >
          {/* Members */}

        </Stack>
        {ButtonGroup}
        </>}
      </Grid>

      <Drawer
        open={isMobileMenuOpen}
        onClose={handleMobileClose}
        sx={{
          display: {
            xs: "block",
            sm: "none",
          },
        }}
      >
        <GroupList w={"50vw"} groups={sampleChats} chatId={chatId} />
      </Drawer>
    </Grid>
  );
};

export default Groups;
