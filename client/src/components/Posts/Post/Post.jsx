import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import moment from 'moment';
import { likePost, deletePost } from '../../../features/posts/postSlice';
import useStyles from './styles';

export const Post = ({ post, setCurrentId ,dispatch,refetch,setRefetch}) => {
  const classes = useStyles;

  return (
    <Card style={classes.card}>
      <CardMedia style={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />
      <div style={classes.overlay}>
        <Typography variant="h6">{post.creator}</Typography>
        <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
      </div>
      <div style={classes.overlay2}>
        <Button style={{ color: 'white' }} size="small" onClick={() => setCurrentId(post._id)}><MoreHorizIcon fontSize="medium" /></Button>
      </div>
      <div style={classes.details}>
        <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
      </div>
      <Typography style={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
      </CardContent>
      <CardActions style={classes.cardActions}>
        <Button size="small" color="primary" onClick={() => {dispatch(likePost(post._id));setRefetch(!refetch)}}><ThumbUpAltIcon fontSize="small" /> &nbsp; Like &nbsp; {post.likeCount} </Button>
        <Button size="small" color="primary" onClick={() => {dispatch(deletePost(post._id));setRefetch(!refetch)}}><DeleteIcon fontSize="small" /> Delete</Button>
      </CardActions>
    </Card>
  );
};