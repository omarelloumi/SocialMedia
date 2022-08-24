import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import useStyles from './styles';
import { createPost, updatePost } from '../../actions/postAction';

export const Form = ({ currentId, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles;
  const post = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));
  const [postData, setPostData] = useState({
    creator: '',
    title: '',
    message: '',
    tags:'',
    selectedFile: ''
  });

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId) {
      dispatch(updatePost(currentId, postData));
    } else {
      dispatch(createPost(postData));
    }
    clear();
  }

  const clear = () => {
    setCurrentId(null);
    setPostData({
      creator: '',
      title: '',
      message: '',
      tags: '',
      selectedFile: ''
    });
  }

  return (
    <Paper style={classes.paper}>
      <form style={classes.form} noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Typography style={{margin:'0px 0 5px'}} variant="h6">{currentId ? `Editing "${post.title}"` : 'Creating a Memory'}</Typography>
        <TextField style={{margin:'5px 0'}} name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator} onChange={(e) => setPostData({ ...postData, creator: e.target.value })} />
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
