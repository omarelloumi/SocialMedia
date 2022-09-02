import React, {useEffect} from 'react'

import { useSelector } from 'react-redux'

import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { fetchPosts } from '../../features/posts/postSlice';
import PostsDefault from './PostsDefault';

export const Posts = ({setCurrentId,refetch, setRefetch,search}) => {
  const posts = useSelector(state => state.posts.posts);
  const searchedPosts = posts.filter(post => post.title.includes(search));
  const classes = useStyles;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPosts());
  }, [refetch,dispatch,search]);
  return (
    <>
      {search==='' ? <PostsDefault posts={posts} classes={classes} setCurrentId={setCurrentId} refetch={refetch} setRefetch={setRefetch} dispatch={dispatch} /> : <PostsDefault posts={searchedPosts} classes={classes} setCurrentId={setCurrentId} refetch={refetch} setRefetch={setRefetch} dispatch={dispatch} /> }
    </>
  )
}