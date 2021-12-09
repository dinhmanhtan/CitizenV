import React from "react";
import { Grid, Paper, Avatar, TextField, Button } from "@mui/material";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
// import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/authContext";
import AlertMessage from "./AlertMessage";

import "./login.css";

const LoginForm = () => {
  // state login and auth context
  const { loginUser } = useContext(AuthContext);

  const [alert, setAlert] = useState(null);
  const [loginForm, setLoginForm] = useState({
    id: "",
    password: "",
  });

  // handle login

  const login = async (event) => {
    event.preventDefault();
    try {
      const loginData = await loginUser(loginForm);
      if (!loginData.success) {
        setAlert({ type: "danger", message: loginData.message });
        setTimeout(() => setAlert(null), 5000);
      }

      //   navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  // const paperStyle = {
  //   padding: 20,
  //   height: "50vh",
  //   width: 280,
  //   margin: "auto",
  // };
  const avatarStyle = { backgroundColor: "#1bbd7e", marginBottom: "10px" };
  const inputStyle = { margin: "25px 0" };
  const btnStyle = { marginTop: 20 };

  const { id, password } = loginForm;

  const handleChangeLogin = (event) => {
    setLoginForm({ ...loginForm, [event.target.name]: event.target.value });
  };

  return (
    <Grid className="login">
      <Paper elevation={10} className="paperStyle">
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>CitizenV</h2>
        </Grid>
        <AlertMessage info={alert} />
        <form onSubmit={login}>
          <TextField
            label="Username"
            placeholder="Enter username"
            fullWidth
            required
            onChange={handleChangeLogin}
            name="id"
            value={id}
          />
          <TextField
            label="Password"
            placeholder="Enter password"
            type="password"
            fullWidth
            required
            name="password"
            value={password}
            onChange={handleChangeLogin}
            style={inputStyle}
          />

          <Button
            type="submit"
            color="primary"
            variant="contained"
            className="btnStyle"
            fullWidth
            style={btnStyle}
          >
            Sign in
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};

export default LoginForm;
