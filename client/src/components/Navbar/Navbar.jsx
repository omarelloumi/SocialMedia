import React from 'react'
import { AppBar, Typography } from '@mui/material';
import memories from '../../images/memories.png';
import {useStyles} from './styles';

const Navbar = () => {
    const classes = useStyles;
  return (
    <AppBar position="static" color="inherit" style={classes.appBar}>
        <Typography style={classes.heading} variant="h2" align="center">Memories</Typography>
        <img src={memories} alt="memories" height="60" width="60" style={classes.image}/>
    </AppBar>
  )
}

export default Navbar