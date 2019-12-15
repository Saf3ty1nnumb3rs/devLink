const express = require('express');
const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');
const router = express.Router();

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');

// @route  POST api/posts
// @desc   Create a post
// @access Private

router.post('/', [
  auth,
  check('text', 'Text is required').not().isEmpty()
],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) res.status(400).json({ errors: errors.array() });

    try {
      const user = await User.findById(req.user.id).select('-password');
      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
        edited: {
          updated: false,
        }
      });
      const post = await newPost.save();
      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

// @route  PUT api/posts/:post_id
// @desc   Edit a post
// @access Private

router.put('/:post_id', [
  auth,
  check('text', 'Text is required').not().isEmpty()
],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) res.status(400).json({ errors: errors.array() });
    // Confirm and acquirer original post
    const ogPost = await Post.findOne({ _id: req.params.post_id });

    if (!ogPost) { // If post not found
      res.status(404).json({ errors: [{ msg: 'Resource Not Found' }] });

    } else if (ogPost.user.toString() !== req.user.id) { // if incorrect user somehow attempts to access resource
      res.status(401).json({ errors: [{ msg: 'Invalid Credentials; User not authorized' }] });

    } else {
      const { text } = req.body; // only value that should change
      const { name, avatar, user, likes, comments, date } = ogPost // all other values should remain the same
      let newPost = {
        text,
        name,
        avatar,
        user,
        likes,
        comments,
        date,
        edited: { // added to create updated post feature
          updated: true,
          date: Date.now()
        }
      };

      try {
        // find and update resource and ensure id remains the same
        const post = await Post.findOneAndUpdate(
          { _id: req.params.post_id },
          { $set: { _id: req.params.post_id, ...newPost } },
          { new: true }
        );
        res.status(200).json(post);
      } catch (err) {
        console.error(err.message);
        res.status(500).json({ errors: [{ msg: 'Server Error' }] });
      }
    }
  });

// @route  GET api/posts
// @desc   Get all posts
// @access Private

router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
});

// @route  GET api/posts/:id
// @desc   Get posts  by id
// @access Private

router.get('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) res.status(404).json({ msg: 'Post Not Found' });
    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') res.status(404).json({ msg: 'Post Not Found' });
    res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
});

// @route  DELETE api/posts/:id
// @desc   DELETE posts  by id
// @access Private

router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: 'Post Not Found' });
    }
    // Check on the user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ errors: [{ msg: 'Invalid Credentials; User not authorized' }] });
    }
    await post.remove();
    res.json({ msg: 'Post Removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') res.status(404).json({ msg: 'Post Not Found' });
    res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
});

// @route  PUT api/posts/like/:id
// @desc   Like a post
// @access Private

router.put('/like/:id', auth, async (req, res) => {
  const post = await Post.findById(req.params.id);
  try {
    // Check if liked by user already
    if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
      return res.status(400).json({ msg: 'Post already liked' });
    }
    post.likes.unshift({ user: req.user.id });

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') res.status(404).json({ msg: 'Post Not Found' });
    res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
});

// @route  PUT api/posts/unlike/:id
// @desc   Unlike a post
// @access Private

router.put('/unlike/:id', auth, async (req, res) => {
  const post = await Post.findById(req.params.id);
  try {
    // Check if liked by user already
    if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
      return res.status(400).json({ msg: 'Post has not yet been liked' });
    }
    // Get remove index
    post.likes = post.likes.filter(like => like.user.toString() !== req.user.id);

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') res.status(404).json({ msg: 'Post Not Found' });
    res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
});

// @route  PUT api/posts/:id/comment
// @desc   Comment on a post
// @access Private

router.post('/:id/comment', [
  auth,
  check('text', 'Text is required').not().isEmpty()
],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) res.status(400).json({ errors: errors.array() });

    try {
      const user = await User.findById(req.user.id).select('-password');
      const post = await Post.findById(req.params.id);
      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      };
      post.comments.unshift(newComment);

      await post.save();

      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

// @route  PUT api/posts/:post_id/comment/:com_id
// @desc   Edit a comment
// @access Private

router.put('/:post_id/comment/:com_id', [
  auth,
  check('text', 'Text is required').not().isEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) res.status(400).json({ errors: errors.array() });

  try {
    const user = await User.findById(req.user.id).select('-password');
    const ogPost = await Post.findById(req.params.post_id);
    const newComment = {
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id
    };
    const post = await Post.findOneAndUpdate(
      { user: ogPost.user, 'comments._id': req.params.com_id },
      {
        $set: {
          'comments.$': { _id: req.params.com_id, ...newComment }
        }
      },
      { new: true }
    );

    res.status(200).json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') res.status(404).json({ msg: 'Post Not Found' });
    res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
});

// @route  DELETE api/posts/:post_id/comment/:com_id
// @desc   DELETE a comment
// @access Private

router.delete('/:post_id/comment/:com_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    const comment = post.comments.find(com => com.id === req.params.com_id)

    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist' });
    }
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    post.comments = post.comments.filter(com => com.id !== req.params.com_id);

    await post.save();

    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') res.status(404).json({ msg: 'Post Not Found' });
    res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
});

module.exports = router;
