import React from "react";
import Alert from "@mui/material/Alert";

const AlertMessage = ({ info }) => {
  return info === null ? null : (
    <Alert severity="warning" fullWidth>
      <b>{info.message}</b>
    </Alert>
  );
};

export default AlertMessage;
