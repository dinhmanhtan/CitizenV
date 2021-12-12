import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect } from "react";

export default function AlertDialog(props) {
  // const [open, setOpen] = React.useState(true);
  const { title, content, open, setOpen, action } = props;

  const handleClose = () => {
    setOpen(false);
  };

  const confirm = () => {
    setOpen(false);

    action();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={confirm}>Xác Nhận</Button>
          <Button onClick={handleClose} autoFocus>
            Hủy Bỏ
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
