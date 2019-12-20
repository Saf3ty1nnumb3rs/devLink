import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Alert from '../shared/Alert';
import { setAlert } from '../../actions/alertActions';
import { isNameValid, isEmailValid } from '../../utils/inputValidation';



const Register = ({ setAlert, match, alerts }) => {
  const [formData, setData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });
  const [form, setForm] = useState('register');

  const { name, email, password, password2 } = formData;

  useEffect(() => {
    match.url.includes('login') ? setForm('login') : setForm('register');
    return setData({
      name: '',
      email: '',
      password: '',
      password2: ''
    })
  }, [match.url]);

  const renderAlerts = alerts => (
    <div className="alert box">
      {alerts.map(({ id, alertType, msg }) => <Alert key={id} id={id} alertType={alertType} msg={msg} />)}
    </div>
  )

  const onChange = e => setData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async e => {
    e.preventDefault();
    if (form === 'register' && password !== password2) {
      setAlert('Passwords do not match.', 'danger');
    }
    if (!isNameValid(name)) {
      setAlert('Please enter a full name with letters A-Z and only characters . , \' , or -', 'danger');
    }
    if (!isEmailValid(email)) {
      setAlert('Please enter a valid email address', 'danger');
    }
  }


  const renderCallToAction = () => {
    return form === 'register' ? (
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    ) : (
        <p className="my-1">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      )
  }
  const buttonLabel = form === 'register' ? 'Register' : 'Log In';
  const sign = form === 'register' ? 'Sign Up' : 'Sign In';
  const header = form === 'register' ? 'Create Your Account' : 'Sign In To Your Account';

  return (
    <>
      <section className="container">
        {alerts && alerts !== null && alerts.length > 0 && renderAlerts(alerts)}
        <h1 className="large text-primary">{sign}</h1>
        <p className="lead"><i className="fas fa-user"></i> {header}</p>
        <form className="form" action="create-profile.html" onSubmit={e => onSubmit(e)}>
          {form === 'register' &&
            <div className="form-group">
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={name}
                onChange={e => onChange(e)}
                required
              />
            </div>
          }
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              autoComplete="email"
              onChange={e => onChange(e)}
              value={email}
            />
            {form === 'register' &&
              <small className="form-text">
                This site uses Gravatar so if you want a profile image, use a Gravatar email
              </small>
            }
          </div>
          <div className="form-group">
            <input
              type="password"
              autoComplete={form === 'register' ? 'new-password' : 'password'}
              placeholder="Password"
              name="password"
              onChange={e => onChange(e)}
              value={password}
              minLength="6"
            />
          </div>
          {form === 'register' &&
            <div className="form-group">
              <input
                type="password"
                placeholder="Confirm Password"
                autoComplete={form === 'register' ? 'new-password' : 'password'}
                name="password2"
                onChange={e => onChange(e)}
                value={password2}
                minLength="6"
              />
            </div>
          }
          <input type="submit" className="btn btn-primary" value={buttonLabel} />
        </form>
        {renderCallToAction()}
      </section>
    </>
  );
};

Register.propTypes = {
  alerts: PropTypes.array.isRequired,
  setAlert: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
};

const mapStateToProps = ({ alerts }) => ({
  alerts
});

export default connect(mapStateToProps, { setAlert })(Register);