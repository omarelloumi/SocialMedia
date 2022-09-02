const mongoose = require('mongoose');
const Post = require('../models/Post');

const getPosts = async (req, res) => {
    try {
        const posts = await Post.find({});
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createPost = async (req, res) => {
    console.log(req.body);
    const post = {
        title : req.body.title,
        message : req.body.message,
        selectedFile : req.body.selectedFile,
        tags : req.body.tags,
        name : req.body.name,
        creator : req.userId,
    }
    const newPost = new Post(post);
    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updatePost = async (req, res) => {
    const { id : _id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).send("Invalid ID");
    }
    const post = req.body;
    try {
        const updatedPost = await Post.findByIdAndUpdate(_id, {...post,_id} , { new: true });
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deletePost = async (req, res) => {
    const { id : _id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).send("Invalid ID");
    }
    try {
        await Post.findByIdAndDelete(_id);
        res.status(200).json({ message: "Post deleted" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const likePost = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
      }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const post = await Post.findById(id);

    const index = post.likes.findIndex((id) => id ===String(req.userId));

    if (index === -1) {
      post.likes.push(req.userId);
    } else {
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }
    
    const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });
    res.status(200).json(updatedPost);
}

module.exports = {
    getPosts,
    createPost,
    updatePost,
    deletePost,
    likePost
}