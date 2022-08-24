import React, {useEffect} from 'react'
import { Grid, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux'
import { Post } from './Post/Post'
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { getPosts } from '../../actions/postAction';



export const Posts = ({setCurrentId}) => {
  const posts = useSelector(state => state.posts)
  const classes = useStyles;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, [posts]);
  return (
    !posts.length ? <CircularProgress style={classes.progress} /> :
    (
      <Grid style={classes.mainContainer} container alignItems="stretch" spacing={3} >
        {posts.map((post,i) => (
          <Grid key={i} item xs={12} lg={4}>
            <Post  post={post} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>

    )
  
  )
}
