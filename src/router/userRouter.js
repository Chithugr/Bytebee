const express = require('express');

const router = express(); // Use 'express.Router()' to create a router instance
const {
    getPostById,
    getAllPosts,
    createPost,
    updatePost,
    deletePost,
    getTotalLikes,
    likePost,
    unlikePost,
    checkIfUserLikedPost,
} = require('../controllers/userController');

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
        const result = await updatePost({ postId, title, description })
        res.status(204).send(result);

    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});
router.delete('/delete/:postId', async (req, res) => {
    try {
        const { postId} = req.params;
        const result = await deletePost({postId});
        res.status(200).send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

router.post('/likes/:postId', async (req, res) => {
    try {
        const postId = req.params.postId;
        const hasLiked = checkIfUserLikedPost(postId);
        if (hasLiked) {
          return res.status(400).json({ error: 'User has already liked the post' });
        }
        // If the user hasn't liked the post, proceed with liking
        const likes = await likePost(postId);
        res.json({ likes });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
});

router.delete('/likes/:postId', async (req, res) => {
    try {
      const postId = req.params.postId;
      const hasLiked = await checkIfUserLikedPost( postId);
      if (!hasLiked) {
        return res.status(400).json({ error: 'User has not liked the post' });
      }
      // If the user has liked the post, proceed with unliking
      const likes = await unlikePost(postId);
      res.json({ likes });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});
  


router.get('/like', async (req, res) => {
    try {
      const totalLikes = await getTotalLikes();
      res.json({ totalLikes });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;