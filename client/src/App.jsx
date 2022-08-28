import React, { useState } from "react";
import { Container, Grow, Grid } from '@mui/material';

import { Form } from "./components/Form/Form";
import { Posts } from "./components/Posts/Posts";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const [currentId, setCurrentId] = useState(0);
  
  const [refetch, setRefetch] = useState(true);
  return (
    <>
      <Container maxwidth="lg">
        <Navbar/>
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