import React,{ useState, useEffect } from 'react'
import { AppBar, Typography, Toolbar, Avatar, Button } from '@mui/material';
import memories from '../../images/memories.png';
import {useStyles} from './styles';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import jwt_decode from "jwt-decode";
import { logout as signout } from "../../features/auth/authSlice";
const Navbar = () => {
    const classes = useStyles;
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logout = () => {
      dispatch(signout());
      navigate('/auth');
      setUser(null);
    };

    useEffect(() => {
      const token = user?.token;
        if (token) {
        const decodedToken = jwt_decode(token);
        if (decodedToken.exp * 1000 < new Date().getTime()) logout();
      }
      setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location,dispatch]);

  return (
    <AppBar position="static" color="inherit" style={classes.appBar}>
    <div style={classes.brandContainer}>
        <Typography component={Link} to="/" style={classes.heading} variant="h2" align="center">Memories</Typography>
        <img style={classes.image} src={memories} alt="icon" height="60" />
    </div>
    <Toolbar style={classes.toolbar}>
        {user ? (
          <div style={classes.profile}>
            <Avatar style={classes.purple} alt={user?.name} src={user?.picture}>{user?.name.charAt(0)}</Avatar>
            <Typography style={classes.userName} variant="h6">{user?.name}</Typography>
            <Button variant="contained" style={classes.logout} color="secondary" onClick={logout}>Logout</Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar