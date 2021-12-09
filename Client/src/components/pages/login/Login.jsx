import React from "react";
import "./login.css";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/authContext";

import { Navigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import Progress from "./Progress";

const Login = () => {
  //
  // const navigate = useNavigate();
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);

  if (authLoading) {
    return <Progress />;
  } else if (isAuthenticated) {
    return <Navigate to="/home" />;
  }

  return <LoginForm />;
};

export default Login;
