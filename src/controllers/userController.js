const { v4: uuidv4 } = require('uuid');
const Post = require('../models/userModel');
const postLikes = {};

async function getPostById({ postId }) {
    try {
        const post = await Post.findOne({ postId: postId });
        return post;
    } catch (error) {
        console.error('Error while finding post by ID:', error);
        throw error;
    }
}

const getAllPosts = async () => {
    try {
        return await Post.find({});
    } catch (error) {
        console.error('Error while getting all posts:', error);
        throw error;
    }
    
}

async function createPost({ title, description }) {
    try {
        const newPost = new Post({
            postId: uuidv4(),
            title: title,
            description: description,
        })
        return await newPost.save();
    } catch (error) {
        console.error('Error while creating post:', error);
        throw error;
    }
}

async function updatePost({ postId, title, description }) {
    try {
        const dataToUpdate = {};
        if (title) {
            dataToUpdate.title = title;
        }
        if (description) {
            dataToUpdate.description = description;
        }
        
        const updatePost = await Post.findOneAndUpdate({ postId }, dataToUpdate, { new: true });
        return updatePost;
    } catch (error) {
        console.error('Error while updating post:', error);
        throw error;
    }

}

async function likePost (postId) {
  // Logic for liking a post
  if (!postLikes[postId]) {
    postLikes[postId] = 0;
  }
  postLikes[postId]++;
  return postLikes[postId];
};
// Logic for unliking a post
async function unlikePost (postId) {
  if (!postLikes[postId]) {
    postLikes[postId] = 0;
  }
  postLikes[postId] = Math.max(0, postLikes[postId] - 1);
  return postLikes[postId];

};

async function checkIfUserLikedPost(postId) {
    try {
        return postLikes[postId] && postLikes[postId].includes(userId);
    } catch (error) {
      console.error('Error checking if user liked post:', error);
      throw error; // Rethrow the error to be caught by the calling function
    }
  };


// Calculate the total likes from the postLikes object or your database
async function getTotalLikes () {
    try{
        const totalLikes = Object.values(postLikes).reduce((acc, curr) => acc + curr, 0);
        return totalLikes;
    }catch{
        return 0;
    } 
};

async function deletePost({ postId }) {
    try {
        const result = await Post.deleteOne({ postId });
        return result;
    } catch (error) {
        console.error('Error while deleting post:', error);
        throw error;
    }
}


module.exports = {
    getPostById,
    getAllPosts,
    createPost,
    updatePost,
    deletePost,
    getTotalLikes,
    likePost,
    unlikePost,
    checkIfUserLikedPost,
    
}