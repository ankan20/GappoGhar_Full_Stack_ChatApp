import { Button, Dialog,  DialogActions,  DialogContentText, DialogTitle } from '@mui/material'
import React from 'react'

const ConfirmDeleteDialog = ({open , handleClose , deleteHandler}) => {
  return (
    <Dialog open={open} onClose={handleClose} >

        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContentText padding={"1rem"}>Are you sure you want to delete this group ?</DialogContentText>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button color='error' onClick={deleteHandler}>Delete</Button>
        </DialogActions>
    </Dialog>
  )
}

export default ConfirmDeleteDialog
