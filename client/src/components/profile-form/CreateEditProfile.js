import React, { useState, useEffect } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Input from '../shared/Input';
import { createProfile, getCurrentProfile } from '../../actions/profileActions';

const CreateProfile = ({
  createProfile,
  getCurrentProfile,
  profile: { profile, loading },
  history
}) => {
  const [formData, setFormData] = useState({
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    githubusername: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: ''
  });
  const [displaySocialInputs, toggleSocialInputs] = useState(false);
  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram
  } = formData;
  const edit = history.location.pathname.includes('edit');
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history, edit);
  };

  useEffect(() => {
    getCurrentProfile();
    if (edit) {
      setFormData({
        company: loading || !profile.company ? '' : profile.company,
        website: loading || !profile.website ? '' : profile.website,
        location: loading || !profile.location ? '' : profile.location,
        status: loading || !profile.status ? '' : profile.status,
        skills: loading || !profile.skills ? '' : profile.skills.join(','),
        githubusername:
          loading || !profile.githubusername ? '' : profile.githubusername,
        bio: loading || !profile.bio ? '' : profile.bio,
        twitter: loading || !profile.social ? '' : profile.social.twitter,
        facebook: loading || !profile.social ? '' : profile.social.facebook,
        linkedin: loading || !profile.social ? '' : profile.social.linkedin,
        youtube: loading || !profile.social ? '' : profile.social.youtube,
        instagram: loading || !profile.social ? '' : profile.social.instagram
      });
    }
  }, [loading, getCurrentProfile, edit]);
  const action = edit ? 'Edit' : 'Create';
  return loading && profile === null ? (
    <Redirect to='/dashboard' />
  ) : (
      <>
        <h1 className='large text-primary'>{`${action} Your Profile`}</h1>
        <p className='lead'>
          <i className='fas fa-user' /> Let's get some information to make your
          profile stand out
			</p>
        <p className="lean bold">* = required field</p>
        <form className='form' onSubmit={e => onSubmit(e)}>
          <div className='form-group'>
            <select name='status' value={status} onChange={e => onChange(e)}>
              <option value='0'>* Select Professional Status</option>
              <option value='Developer'>Developer</option>
              <option value='Junior Developer'>Junior Developer</option>
              <option value='Senior Developer'>Senior Developer</option>
              <option value='Manager'>Manager</option>
              <option value='Student or Learning'>Student or Learning</option>
              <option value='Instructor'>Instructor or Teacher</option>
              <option value='Intern'>Intern</option>
              <option value='Other'>Other</option>
            </select>
            <small className='form-text'>
              Give us an idea of where you are at in your career
					</small>
          </div>
          <Input
            type='text'
            placeholder='Company'
            name='company'
            value={company}
            onChange={e => onChange(e)}
            showText
            formText={'Could be your own company or one you work for'}
          />
          <Input
            type='text'
            placeholder='Website'
            name='website'
            value={website}
            onChange={e => onChange(e)}
            showText
            formText={'Could be your own or a company website'}
          />
          <Input
            type='text'
            placeholder='Location'
            name='location'
            value={location}
            onChange={e => onChange(e)}
            showText
            formText={'City & state suggested (eg. Boston, MA)'}
          />
          <Input
            type='text'
            placeholder='* Skills'
            name='skills'
            value={skills}
            onChange={e => onChange(e)}
            showText
            formText={'Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)'}
          />
          <Input
            type='text'
            placeholder='Github Username'
            name='githubusername'
            value={githubusername}
            onChange={e => onChange(e)}
            showText
            formText={'If you want your latest repos and a Github link, include your username'}
          />
          <div className='form-group'>
            <textarea
              placeholder='A short bio of yourself'
              name='bio'
              value={bio}
              onChange={e => onChange(e)}
            />
            <small className='form-text'>Tell us a little about yourself</small>
          </div>
          <div className='my-2'>
            <button
              onClick={() => toggleSocialInputs(!displaySocialInputs)}
              type='button'
              className='btn btn-light'
            >
              Add Social Network Links
					</button>
            <span>Optional</span>
          </div>
          {displaySocialInputs && (
            <>
              <Input
                icon={<i className='fab fa-twitter fa-2x' />}
                type='text'
                formClass="social-input"
                placeholder='Twitter URL'
                name='twitter'
                value={twitter}
                onChange={e => onChange(e)}
              />
              <Input
                icon={<i className='fab fa-facebook fa-2x' />}
                type='text'
                formClass="social-input"
                placeholder='Facebook URL'
                name='facebook'
                value={facebook}
                onChange={e => onChange(e)}
              />
              <Input
                icon={<i className='fab fa-youtube fa-2x' />}
                type='text'
                formClass="social-input"
                placeholder='YouTube URL'
                name='youtube'
                value={youtube}
                onChange={e => onChange(e)}
              />
              <Input
                icon={<i className='fab fa-linkedin fa-2x' />}
                type='text'
                formClass="social-input"
                placeholder='Linkedin URL'
                name='linkedin'
                value={linkedin}
                onChange={e => onChange(e)}
              />
              <Input
                icon={<i className='fab fa-instagram fa-2x' />}
                type='text'
                formClass="social-input"
                placeholder='Instagram URL'
                name='instagram'
                value={instagram}
                onChange={e => onChange(e)}
              />
            </>
          )}
          <div className="flex-block">
            <div className="flex-block-text">
              <Link to='/dashboard'>
                <i className='fas fa-arrow-alt-circle-left fa-2x' />
              </Link>
              <p>Back To Dashboard</p>
            </div>
            <Input type='submit' value='Submit' className='btn btn-primary my-1' />
          </div>
        </form>
      </>
    );
}

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile
});
export default withRouter(connect(mapStateToProps, { createProfile, getCurrentProfile })(CreateProfile));