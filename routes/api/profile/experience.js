const express = require('express');
const { check, validationResult } = require('express-validator');

const router = express.Router();
const auth = require('../../../middleware/auth');

const Profile = require('../../../models/Profile');

// @route  PUT api/profile/experience
// @desc   Delete profile, user & posts
// @access Private

router.put('/', [auth, [
  check('title', 'Title is required').not().isEmpty(),
  check('company', 'Company is required').not().isEmpty(),
  check('from', 'From date is required').not().isEmpty(),
  check('current', 'Please indicate whether or not you are currently working at this company').not().isEmpty()
]], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) res.status(400).json({ errors: errors.array() });

  const {
    title,
    company,
    location,
    from,
    to,
    current,
    description
  } = req.body;

  const newExp = { title, company, from, current }
  if (location) newExp.location = location;
  if (to) newExp.to = to;
  if (description) newExp.description = description;

  try {
    const profile = await Profile.findOne({ user: req.user.id });
    profile.experience.unshift(newExp);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route  DELETE api/profile/experience/:exp_id
// @desc   Delete an experience item
// @access Private

router.delete('/:exp_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    profile.experience = profile.experience.filter(item => item.id !== req.params.exp_id);

    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route  PUT api/profile/experience/:exp_id
// @desc   Edit an experience item so you may update at will
// @access Private
router.put('/:exp_id', [auth, [
  check('title', 'Title is required').not().isEmpty(),
  check('company', 'Company is required').not().isEmpty(),
  check('from', 'From date is required').not().isEmpty(),
  check('current', 'Please indicate whether or not you are currently working at this company').not().isEmpty()
]], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) res.status(400).json({ errors: errors.array() });

  const {
    title,
    company,
    location,
    from,
    to,
    current,
    description
  } = req.body;

  const newExp = { title, company, from, current }
  if (location) newExp.location = location;
  if (to) newExp.to = to;
  if (description) newExp.description = description;

  try {
    const profile = await Profile.findOneAndUpdate(
      { user: req.user.id, 'experience._id': req.params.exp_id },
      {
        $set: {
          'experience.$': { _id: req.params.exp_id, ...newExp }
        }
      },
      { new: true }
    );
    res.status(200).json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;