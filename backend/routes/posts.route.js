const Router = require('express').Router;
const PostsController = require('../controllers/posts.controller');
const authorize = require('../middlewares/auth.middleware');
const getFile = require('../middlewares/file.middleware');

const router = module.exports = new Router();

/**
 * Get Posts
 */
router.get('', PostsController.getPosts);

/**
 * Get Post By Id
 */
router.get('/:id', PostsController.getPost);

/**
 * Add Post
 */
router.post(
  '',
  authorize,
  getFile('image'),
  PostsController.createPost,
);

/**
 * Patch Post
 */
router.patch(
  '/:id',
  authorize,
  getFile('image'),
  PostsController.updatePost,
);

/**
 * Delete Post
 */
router.delete('/:id', authorize, PostsController.deletePost);
