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
    const post = req.body;
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
    const { id : _id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).send("Invalid ID");
    }
    try {
        const post = await Post.findById(_id);
        post.likeCount++;
        await post.save();
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getPosts,
    createPost,
    updatePost,
    deletePost,
    likePost
}