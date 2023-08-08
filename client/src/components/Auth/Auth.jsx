import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Avatar,
  Button,
  Paper,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Input from "./Input";
import { useStyles } from "./styles";
import jwt_decode from "jwt-decode";
import { googleAuth } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signin, signup } from "../../features/auth/authSlice"; 

const Auth = () => {
  const navigate = useNavigate();
  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    navigate : navigate,
  };
  const classes = useStyles;
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      dispatch(signup(form));
    } else {
      dispatch(signin(form));
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const handleGoogleLogin = (response) => {
    const authData = {
      result : jwt_decode(response.credential),
      token: response.credential,
      navigate: navigate,
    };
    dispatch(googleAuth(authData));
  }

/*
  useEffect(() => {
    google.accounts.id.initialize({
      client_id: "686444786669-7neoafvljedel03hjedv04bn00t9p3ls.apps.googleusercontent.com",
      callback: handleGoogleLogin
    });
    google.accounts.id.renderButton(
      document.getElementById("signInGoogle"),
      { scope: 'profile email',
      width: '355',
      theme: 'filled_blue', }
    )
  })*/

  return (
    <Container component="main" maxWidth="xs">
      <Paper style={classes.paper} elevation={3}>
        <Avatar style={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isSignup ? "Sign up" : "Sign in"}
        </Typography>
        <form style={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={classes.submit}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
          <Grid container
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
          >
            <Grid item>
              <div id="signInGoogle"> </div>
            </Grid>
          </Grid>
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account? Sign in"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
