const multer = require('multer');
const Router = require('express').Router;
const authorize = require('../middlewares/auth.middleware');
const Post = require('../models/post');

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
router.get('', async (req, res) => {
  const query = Post.find();
  const { limit, page } = req.query;

  if (limit && page) {
    query.skip(+limit * (+page - 1)).limit(+limit);
  }

  const fetchedPosts = await query.sort({ createdAt: 'desc' });
  const count = await Post.count();

  res.json({
    data: fetchedPosts,
    total: count,
  });
});

/**
 * Get Post By Id
 */
router.get('/:id', async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.json(post);
});

/**
 * Add Post
 */
router.post('', authorize, multer({ storage }).single('image'), async (req, res) => {
  const { title, content } = req.body;
  const file = req.file;
  const author = req.userData.userId;

  if (!(title && content && file)) {
    res.status(400).json({ message: 'Invalid post data' });
  }

  const post = new Post({
    title,
    content,
    author,
    imagePath: `http://localhost:3000/images/${req.file.filename}`,
  });
  const createdPost = await post.save();
  res.status(201).json(createdPost);
});

/**
 * Patch Post
 */
router.patch('/:id', authorize, multer({ storage }).single('image'), async (req, res) => {
  const { title, content } = req.body;
  let { imagePath } = req.body;
  const file = req.file;

  if (!(title && content && (imagePath || file))) {
    res.status(400).json({ message: 'Invalid post data' });
  }

  if (req.file) {
    imagePath = `http://localhost:3000/images/${req.file.filename}`;
  }

  const post = await Post.findById(req.params.id);
  if (post.author !== req.userData.userId) {
    res.status(403).json({ message: 'You do not have permisson to edit this post' });
  }

  post.title = title;
  post.content = content;
  post.imagePath = imagePath;
  await post.save();

  res.json(null);
});

/**
 * Delete Post
 */
router.delete('/:id', authorize, async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post.author !== req.userData.userId) {
    req.status(403).json({ message: 'You do not have permission to delete this post' });
  }

  res.status(200);
});
