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

const Login = (props) => {

  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const setUserData = useUserStore((state) => state.setUserData);


  const onSubmit = (e) => {
    console.log("runs");
    e.preventDefault();

    setLoading(true);
    requestHandler({ route: "auth/login", type: "post", body: loginData }).then(
      (loginData) => {
        setLoading(false);
        if (loginData?.email) {
          setUserData(loginData);
        } else {
          props.setNotify({
            type: "error",
            message: loginData?.errors ? loginData.errors : "error logging in",
          });
        }
      }
    );
  };

  const onHandleChange = (value, name) => {
    setLoginData({ ...loginData, [name]: value });
  };

  const loginInputs = [
    {
      type: "email",
      name: "email",
      value: loginData.email,
    },
    {
      type: "password",
      minLength: 6,
      name: "password",
      value: loginData.password,
      helperText: "Atleast 6 characters are required for the password",
    },
  ];

  return (
    <Grow in={loginInputs.length !== 0}>
      <Card raised sx={props.cardStyles}>
        <Typography variant={"h5"} sx={{ mb: 2 }} color="primary">
          Login
        </Typography>
        <Box component="form" onSubmit={onSubmit} autoComplete="off">
          {loginInputs.map((input) => (
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
          onClick={() => props.setShowFormType("register")}
          variant={"caption"}
          sx={{ mb: 2, cursor: "pointer" }}
        >
          I want to register
        </Typography>
        {loading && <LinearProgress sx={{ mt: 1 }} />}
      </Card>
    </Grow>
  );
};

export default Login;
