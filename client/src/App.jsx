import React, { useEffect,useState } from "react";
import { Container, AppBar, Typography, Grow, Grid } from '@mui/material';
import memories from './images/memories.png';
import {useStyles} from './styles';
import { Form } from "./components/Form/Form";
import { useDispatch } from 'react-redux';
import { getPosts } from './actions/postAction';
import { Posts } from "./components/Posts/Posts";

function App() {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const classes = useStyles;

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

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
                <Posts setCurrentId={setCurrentId} />
              </Grid>
              <Grid item xs={12} sm={4} >
                <Form currentId={currentId} setCurrentId={setCurrentId} />
              </Grid>
            </Grid>
          </Container>
        </Grow>
      </Container>
    </>
  );
}

export default App;