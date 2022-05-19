const multer = require('multer');
const Router = require('express').Router;
const PostsController = require('../controllers/posts.controller');
const authorize = require('../middlewares/auth.middleware');

const MIME_TYPE_MAP = new Map([
  ['image/png', 'png'],
  ['image/jpeg', 'jpg'],
  ['image/jpg', 'jpg'],
]);

const router = module.exports = new Router();
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const isValid = MIME_TYPE_MAP.has(file.mimetype);
    const error = !isValid ? new Error('Invalid file type! Only png, jpg, jpeg is allowed.') : null;
    callback(error, 'backend/public/images');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.toLowerCase().replace(/(\s|\/|\\)+/g, '-');
    const ext = MIME_TYPE_MAP.get(file.mimetype);
    callback(null, `${name}-${Date.now()}.${ext}`);
  },
});

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
  multer({ storage }).single('image'),
  PostsController.createPost,
);

/**
 * Patch Post
 */
router.patch(
  '/:id',
  authorize,
  multer({ storage }).single('image'),
  PostsController.updatePost,
);

/**
 * Delete Post
 */
router.delete('/:id', authorize, PostsController.deletePost);
