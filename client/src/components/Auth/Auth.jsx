import React,{useState} from 'react'
import { Container, Typography, Grid, Avatar, Button,Paper } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Input from './Input';
import {useStyles} from './styles';
import { GoogleLogin } from 'react-google-login';
import Icon from './assets/Icon.js';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {
  const classes = useStyles;
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {}

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const googleSuccess = async (res) => {};

  const googleError = () => alert('Google Sign In was unsuccessful. Try again later');

  return (
    <Container component="main" maxWidth="xs">
    <Paper style={classes.paper} elevation={3}>
      <Avatar style={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">{ isSignup ? 'Sign up' : 'Sign in' }</Typography>
      <form style={classes.form} onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          { isSignup && (
          <>
            <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
            <Input name="lastName" label="Last Name" handleChange={handleChange} half />
          </>
          )}
          <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
          <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
          { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
        </Grid>
        <Button type="submit" fullWidth variant="contained" color="primary" style={classes.submit}>
          { isSignup ? 'Sign Up' : 'Sign In' }
        </Button>
        <Grid container justify="flex-end">
          <Grid item>
            <Button onClick={switchMode}>
              { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
            </Button>
            <GoogleLogin
              clientId="564033717568-e5p23rhvcs4i6kffgsbci1d64r8hp6fn.apps.googleusercontent.com"
              render={(renderProps) => (
              <Button style={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                Google Sign In
              </Button>
              )}
              onSuccess={googleSuccess}
              onFailure={googleError}
              cookiePolicy="single_host_origin"
            />
          </Grid>
        </Grid>
      </form>
    </Paper>
  </Container>
  )
}

export default Auth