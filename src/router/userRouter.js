const express = require('express');
const router = express(); // Use 'express.Router()' to create a router instance
const {
    getPostById,
    getAllPosts,
    createPost,
    updatePost,
    deletePost,
    getLatestPosts,
    getTotalLikes,
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

router.get('/posts/:postId/likes', async (req, res) => {
    try{
        const { postId } = req.params;
        const result = await getTotalLikes({ postId });
        res.status(200).send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});
  
router.get('/posts/latest', async (req, res) => {
    try {
        const result = "";
        res.status(200).send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

router.get('/like', async (req, res) => {
    try {
        const result = await getlikes();
        res.status(200).send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

module.exports = router;