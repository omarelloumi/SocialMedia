import React from 'react'
import { AppBar, Typography, Toolbar, Avatar, Button } from '@mui/material';
import memories from '../../images/memories.png';
import {useStyles} from './styles';
import { Link } from 'react-router-dom';
const Navbar = () => {
    const classes = useStyles;
    const user = null;
    const logout = () => {};
  return (
    <AppBar position="static" color="inherit" style={classes.appBar}>
    <div style={classes.brandContainer}>
        <Typography component={Link} to="/" style={classes.heading} variant="h2" align="center">Memories</Typography>
        <img style={classes.image} src={memories} alt="icon" height="60" />
    </div>
    <Toolbar style={classes.toolbar}>
        {user ? (
          <div style={classes.profile}>
            <Avatar style={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
            <Typography style={classes.userName} variant="h6">{user?.result.name}</Typography>
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