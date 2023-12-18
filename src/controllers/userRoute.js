const express = require('express');
const router = express(); // Use 'express.Router()' to create a router instance
const {
    getPostById,
    getAllPosts,
    createPost,
    updatePost,
    deletePost,
    getLatestPosts,
} = require('./userController');

router.get('/', async (req, res) => {
    const result = await getAllPosts();
    res.status(200).send(result);
});
router.get('/get/:postId', async (req, res) => {
    try {
        const { postId } = req.params;
        console.log(postId);
        const result = await getPostById({ postId });
        res.status(200).send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    
    }
});
router.post('/', async (req, res) => {
    try {
        const { title, description, likes} = req.body;
        const result = await createPost({ title, description, likes })
        res.status(201).send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});
router.put('/update/:postId', async (req, res) => {
    try {
        const { title, description } = req.body;
        const { postId} = req.params;
        const result = await updatePost({ title, description })
        res.status(204).send(result);

    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});
router.delete('delete/:postId', async (req, res) => {
    try {

        const result = await deletePost({ postId });
        res.status(200).send(result);

    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

router.post('/posts/:postId/likes', (req, res) => {
    const postId = req.params.postId;
  
    // Check if the post exists
    if (!postLikes[postId]) {
      postLikes[postId] = 0;
    }
    // Increment the number of likes
    postLikes[postId]++;
  
    res.json({ likes: postLikes[postId] });
  });
  
  // Endpoint to remove a like from a post
  router.delete('/posts/:postId/likes', (req, res) => {
    const postId = req.params.postId;
  
    // Check if the post exists
    if (!postLikes[postId]) {
      postLikes[postId] = 0;
    }
  
    // Decrement the number of likes (minimum 0)
    postLikes[postId] = Math.max(0, postLikes[postId] - 1);
  
    res.json({ likes: postLikes[postId] });
  });
  
  // Endpoint to get the number of likes for a post
  router.get('/posts/:postId/likes', (req, res) => {
    const postId = req.params.postId;
  
    // Check if the post exists
    if (!postLikes[postId]) {
      postLikes[postId] = 0;
    }
  
    res.json({ likes: postLikes[postId] });
  });

router.get('/latest', async (req, res) => {
    try {
        const result = "";
        res.status(200).send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

module.exports = router;