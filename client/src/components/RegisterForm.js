import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";

import axiosInstance from "../utils/axios";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [registerErrors, setRegisterErrors] = useState({});
  const [register, setRegister] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setRegister({ ...register, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .post("register", register)
      .then(({ data }) => {
        console.log("Register response - ", data);
        window.localStorage.setItem("accessToken", data.accessToken);
        navigate("/reports");
      })
      .catch((err) => {
        // console.log("Error in register", err);
        // console.log("error response data errors", err.response.data.errors);
        setRegisterErrors(err.response.data.errors);
      });
  };
  return (
    <>
      <form className="form-container" onSubmit={handleSubmit}>
        <Typography>Registration</Typography>
        <div className="register-form">
          <TextField
            required
            id="outlined-required"
            label="First Name Required"
            type="text"
            name="firstName"
            value={register.firstName}
            onChange={handleChange}
          />
          {registerErrors.firstName && (
            <p className="error-message">{registerErrors.firstName.message}</p>
          )}
          <TextField
            required
            id="outlined-required"
            label="Last Name Required"
            type="text"
            name="lastName"
            value={register.lastName}
            onChange={handleChange}
          />
          {registerErrors.lastName && (
            <p className="error-message">{registerErrors.lastName.message}</p>
          )}
          <TextField
            required
            id="outlined-required"
            label="Email Required"
            type="email"
            name="email"
            value={register.email}
            onChange={handleChange}
          />
          {registerErrors.email && (
            <p className="error-message">{registerErrors.email.message}</p>
          )}
          <TextField
            required
            id="filled-password-input"
            label="Password Required"
            type="password"
            name="password"
            value={register.password}
            onChange={handleChange}
          />
          {registerErrors.password && (
            <p className="error-message">{registerErrors.password.message}</p>
          )}
          <TextField
            required
            id="filled-password-input"
            label="Confirm Password Required"
            type="password"
            name="confirmPassword"
            value={register.confirmPassword}
            onChange={handleChange}
          />
          {registerErrors.confirmPassword && (
            <p className="error-message">
              {registerErrors.confirmPassword.message}
            </p>
          )}
          <Button type="submit" variant="contained" color="success">
            Register
          </Button>
        </div>
      </form>
    </>
  );
};

export default RegisterForm;
