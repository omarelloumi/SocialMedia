import React, { useState } from "react";
import { Container, AppBar, Typography, Grow, Grid } from '@mui/material';
import memories from './images/memories.png';
import {useStyles} from './styles';
import { Form } from "./components/Form/Form";
import { Posts } from "./components/Posts/Posts";

function App() {
  const [currentId, setCurrentId] = useState(0);
  const classes = useStyles;
  const [refetch, setRefetch] = useState(true);
  return (
    <>
      <Container maxwidth="lg">
        <AppBar position="static" color="inherit" style={classes.appBar}>
          <Typography style={classes.heading} variant="h2" align="center">Memories</Typography>
          <img src={memories} alt="memories" height="60" width="60" style={classes.image}/>
        </AppBar>
        <Grow in>
          <Container>
            <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
              <Grid item xs={12} sm={7} >
                <Posts setCurrentId={setCurrentId} refetch={refetch} setRefetch={setRefetch}/>
              </Grid>
              <Grid item xs={12} sm={4} >
                <Form currentId={currentId} setCurrentId={setCurrentId} refetch={refetch} setRefetch={setRefetch}/>
              </Grid>
            </Grid>
          </Container>
        </Grow>
      </Container>
    </>
  );
}

export default App;