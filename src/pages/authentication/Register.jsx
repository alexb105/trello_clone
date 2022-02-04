import React, { useState } from "react";
import Inputs from "../../components/inputs/Inputs";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Grow from "@mui/material/Grow";
import Notification from "../../components/notification/Notifications";
import { useUserStore } from "../../store";
import { requestHandler } from "../../helpers/requestHandler";

const Register = (props) => {

    const [loading, setLoading] = useState(false);
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const onSubmit = (e) => {
    console.log("runs");
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      return props.setNotify({
        type: "error",
        message: "Password and confirm password does not match",
      });
    }
    setLoading(true);

    requestHandler({
      route: "auth/register",
      type: "post",
      body: registerData,
    }).then((data) => {
      setLoading(false);
      if (data && data === "registered successfully") {
        // login(registerData);
      } else {
        props.setNotify({
          type: "error",
          message: data?.errors ? data.errors : "error registering",
        });
      }
    });
  };

  const onHandleChange = (value, name) => {
    setRegisterData({ ...registerData, [name]: value });
  };

  const passwordUnMatch =
    registerData.password !== registerData.confirmPassword &&
    registerData.confirmPassword &&
    registerData.password;

  const registerInputs = [
    {
      type: "text",
      name: "name",
      value: registerData.name,
    },
    {
      type: "email",
      name: "email",
      value: registerData.email,
    },
    {
      type: "password",
      name: "password",
      minLength: 6,
      value: registerData.password,
    },
    {
      type: "password",
      name: "confirmPassword",
      minLength: 6,
      value: registerData.confirmPassword,
      helperText: passwordUnMatch
        ? "Passwords do not match"
        : "Atleast 6 characters are required for the password",
      error: passwordUnMatch,
    },
  ];

  return (
    <Grow in={registerInputs.length !== 0}>
      <Card raised sx={props.cardStyles}>
        <Typography variant={"h5"} sx={{ mb: 2 }} color="primary">
          Register
        </Typography>
        <div>
        {/* <Button  variant="contained" disabled={loading}>
            Submit
          </Button> */}
        </div>
        <Box component="form" onSubmit={onSubmit} autoComplete="off">
          {registerInputs.map((input) => (
            <Inputs
              key={input.name}
              type={input.type}
              label={input.name}
              name={input.name}
              value={input.value}
              handleChange={onHandleChange}
              placeholder={input.placeholder && input.placeholder}
              inputProps={input.minLength && { minLength: input.minLength }}
              helperText={input.helperText && input.helperText}
              required
              error={input.error && input.error}
              sx={{ mb: 1 }}
            />
          ))}
          <Button type={"submit"} variant="contained" disabled={loading}>
            Submit
          </Button>
        </Box>
        <Typography
          color="primary"
          onClick={() => props.setShowFormType("login")}
          variant={"caption"}
          sx={{ mb: 2, cursor: "pointer" }}
        >
          I want to login
        </Typography>
        {loading && <LinearProgress sx={{ mt: 1 }} />}
      </Card>
    </Grow>
  );
};

export default Register;
