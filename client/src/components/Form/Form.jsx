import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import useStyles from './styles';
import { createPost, updatePost } from '../../features/posts/postSlice';

export const Form = ({ currentId, setCurrentId,refetch, setRefetch }) => {
  const dispatch = useDispatch();
  const classes = useStyles;
  const post = useSelector((state) => (currentId ? state.posts.posts.find((message) => message._id === currentId) : null));
  const [postData, setPostData] = useState({
    title: '',
    message: '',
    tags:'',
    selectedFile: '',
    name: '',
  });
  const [user,setUser] = useState(null);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('profile')))
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId) {
      postData.name = user.result.name;
      dispatch(updatePost(postData));
      setRefetch(!refetch);
    } else {
      postData.name = user.result.name;
      dispatch(createPost(postData));
    }
    clear();
  }

  const clear = () => {
    setCurrentId(null);
    setPostData({
      title: '',
      message: '',
      tags: '',
      selectedFile: ''
    });
  }
  if (!user?.result?.name) {
    return (
      <Paper style={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own memories.
        </Typography>
      </Paper>
    );
  }
  return (
    <Paper style={classes.paper}>
      <form style={classes.form} noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Typography style={{margin:'0px 0 5px'}} variant="h6">{currentId ? `Editing "${post.title}"` : 'Creating a Memory'}</Typography>
        <TextField style={{margin:'5px 0'}} name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
        <TextField style={{margin:'5px 0'}} name="message" variant="outlined" label="Message" fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
        <TextField style={{margin:'5px 0'}} name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
        <div style={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
        <Button style={classes.buttonSubmit} variant="contained" color="primary" type="submit" size="large" fullWidth>Submit Memory</Button>
        <Button variant="contained" color="secondary" onClick={clear} size="small" fullWidth>Clear</Button>
      </form>
    </Paper>
  )
}