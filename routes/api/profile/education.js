const express = require('express');
const { check, validationResult } = require('express-validator');

const router = express.Router();
const auth = require('../../../middleware/auth');

const Profile = require('../../../models/Profile');

router.put('/', [auth, [
  check('school', 'School is required').not().isEmpty(),
  check('degree', 'Degree is required').not().isEmpty(),
  check('from', 'From date is required').not().isEmpty(),
  check('fieldofstudy', 'Please indicate your field of study').not().isEmpty(),
  check('current', 'Please indicate whether or not you are currently working at this company').not().isEmpty()
]], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) res.status(400).json({ errors: errors.array() });

  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description
  } = req.body;

  const newEdu = { school, degree, from, fieldofstudy, current }
  if (to) newEdu.to = to;
  if (description) newEdu.description = description;

  try {
    const profile = await Profile.findOne({ user: req.user.id });
    profile.education.unshift(newEdu);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route  DELETE api/profile/education/:edu_id
// @desc   Delete an education item
// @access Private

router.delete('/:edu_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    profile.education = profile.education.filter(item => item.id !== req.params.edu_id);

    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route  PUT api/profile/education/:edu_id
// @desc   Edit an education item so you may update at will
// @access Private
router.put('/:edu_id', [auth, [
  check('school', 'School is required').not().isEmpty(),
  check('degree', 'Degree is required').not().isEmpty(),
  check('from', 'From date is required').not().isEmpty(),
  check('fieldofstudy', 'Please indicate your field of study').not().isEmpty(),
  check('current', 'Please indicate whether or not you are currently working at this company').not().isEmpty()
]], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) res.status(400).json({ errors: errors.array() });

  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description
  } = req.body;

  const newEdu = { school, degree, from, fieldofstudy, current }
  if (to) newEdu.to = to;
  if (description) newEdu.description = description;

  try {
    const profile = await Profile.findOneAndUpdate(
      { user: req.user.id, 'education._id': req.params.edu_id },
      {
        $set: {
          'education.$': { _id: req.params.edu_id, ...newEdu }
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
