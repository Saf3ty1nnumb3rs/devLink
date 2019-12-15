const express = require('express');
const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');
const router = express.Router();

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');

// @route  GET api/posts
// @desc   Test route
// @access Public
router.get('/', (req, res) => res.send('Posts route'));

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

module.exports = router;
