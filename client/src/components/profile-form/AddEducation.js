import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEducation } from '../../actions/profileActions';
import Input from '../shared/Input';

const AddEducation = ({ addEducation, history }) => {
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    fieldofstudy: '',
    from: '',
    to: '',
    current: false,
    description: ''
  });

  const [toDateDisabled, toggleDisabled] = useState(false);

  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <h1 className='large text-primary'>Add Your Education</h1>
      <p className='lead'>
        <i className='fas fa-code-branch' /> Add any school or bootcamp that you
        have attended
      </p>
      <p className="lean bold danger">* = required field</p>
      <form
        className='form'
        onSubmit={e => {
          e.preventDefault();
          addEducation(formData, history);
        }}
      >
        <Input
          type='text'
          placeholder='* School or Bootcamp'
          name='school'
          value={school}
          onChange={e => onChange(e)}
          required
        />
        <Input
          type='text'
          placeholder='* Degree or Certificate'
          name='degree'
          value={degree}
          onChange={e => onChange(e)}
          required
        />
        <Input
          type='text'
          placeholder='Field of Study'
          name='fieldofstudy'
          value={fieldofstudy}
          onChange={e => onChange(e)}
        />
        <Input
          header={'* From Date'}
          type='date'
          name='from'
          value={from}
          onChange={e => onChange(e)}
        />
        <div className='form-group'>
          <p>
            <input
              type='checkbox'
              name='current'
              checked={current}
              value={current}
              onChange={() => {
                setFormData({ ...formData, current: !current, to: '' });
                toggleDisabled(!toDateDisabled);
              }}
            />{' '}
            Current School
          </p>
        </div>
        <Input
          header={'To Date'}
          type='date'
          name='to'
          value={to}
          onChange={e => onChange(e)}
          disabled={toDateDisabled}
        />
        <div className='form-group'>
          <textarea
            name='description'
            cols='30'
            rows='5'
            placeholder='Program Description'
            value={description}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="flex-block">
          <div className="flex-block-text">
            <Link to='/dashboard'>
              <i className='fas fa-arrow-alt-circle-left fa-2x' />
            </Link>
            <p className="m-1">Back To Dashboard</p>
          </div>
          <Input type='submit' value='Submit' className='btn btn-primary my-1' />
        </div>
      </form>
    </Fragment>
  );
};

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired
};

export default connect(
  null,
  { addEducation }
)(withRouter(AddEducation));