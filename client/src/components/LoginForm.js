import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";

import axiosInstance from "../utils/axios";

const LoginForm = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState();
  const [login, setLogin] = useState({
    password: "",
    email: "",
  });

  const handleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .post("login", login)
      .then(({ data }) => {
        console.log(data);
        window.localStorage.setItem("accessToken", data.accessToken);
        navigate("/reports");
      })
      .catch((err) => {
        console.log("Error in login", err);
        console.log("error response", err.response);
        console.log("error response data errors", err.response.data.message);
        setLoginError(err.response.data.message);
      });
  };

  return (
    <>
      <form className="form-container" onSubmit={handleSubmit}>
        <Typography>Login</Typography>
        <div className="register-form">
          <TextField
            required
            id="outlined-required"
            label="Email"
            type="email"
            name="email"
            value={login.email}
            onChange={handleChange}
          />
          <TextField
            required
            id="filled-password-input"
            label="Password"
            type="password"
            name="password"
            value={login.password}
            onChange={handleChange}
          />
          {loginError && <p className="error-message">{loginError}</p>}
          <Button type="submit" variant="contained" color="success">
            Login
          </Button>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
