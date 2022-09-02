import React,{useState} from 'react'
import { Container, Grow, Grid,AppBar, TextField } from '@mui/material';
import { Form } from "../Form/Form";
import { Posts } from "../Posts/Posts";
import useStyles from './styles';
const Home = () => {
  const [currentId, setCurrentId] = useState(0);
  const classes = useStyles;
  const [refetch, setRefetch] = useState(true);
  const [search, setSearch] = useState('');
  const handleSearch = (e) => {
    setSearch(e.target.value);

  }
  return (
    <Grow in>
          <Container maxWidth="xl">
            <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} style={classes.gridContainer}>
              <Grid item xs={12} sm={8} >
                <Posts setCurrentId={setCurrentId} refetch={refetch} setRefetch={setRefetch} search={search}/>
              </Grid>
              <Grid item xs={12} sm={4} >
                <AppBar style={classes.appBarSearch} position="static" color="inherit">
                  <TextField name="search" variant="outlined" label="Search Memories" fullWidth value={search} onChange={(e) => handleSearch(e)} />
                </AppBar>
                <Form currentId={currentId} setCurrentId={setCurrentId} refetch={refetch} setRefetch={setRefetch}/>
              </Grid>
            </Grid>
          </Container>
    </Grow>
  )
}

export default Home