import React from "react";
import { Box } from "@mui/material";
import RegisterForm from "../components/RegisterForm";
import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <Box
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <div className="row">
        <div className="column-1">
          <RegisterForm />
        </div>

        <div className="column-1">
          <LoginForm />
        </div>
      </div>
    </Box>
  );
};

export default Login;
