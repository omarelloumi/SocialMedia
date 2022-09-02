import React from 'react'
import { Grid, CircularProgress } from '@mui/material';
import { Post } from './Post/Post'
const PostsDefault = ({posts,classes,dispatch,refetch,setCurrentId,setRefetch}) => {
  return (
    <>
    {!posts.length ? <CircularProgress style={classes.progress} /> :
      <Grid style={classes.mainContainer} container alignItems="stretch" spacing={3} >
        {posts.map((post,i) => (
          <Grid key={i} item xs={12} lg={6}>
            <Post  post={post} setCurrentId={setCurrentId} dispatch={dispatch} refetch={refetch} setRefetch={setRefetch}/>
          </Grid>
        ))}
      </Grid>
    }
    </>
  )
}

export default PostsDefault