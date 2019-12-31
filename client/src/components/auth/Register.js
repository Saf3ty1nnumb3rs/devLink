import React, { useState, useEffect, useRef } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Input from '../shared/Input';
import { setAlert } from '../../actions/alertActions';
import { register, login } from '../../actions/authActions';
import { isNameValid, isEmailValid } from '../../utils/inputValidation';



const Register = ({ setAlert, register, isAuthenticated, login, match }) => {
  // Set formData variables
  const [formData, setData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });
  // Set form type - login or register
  const [form, setForm] = useState('register');

  // Set focus refs that move focus forward on enter press
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const password2Ref = useRef(null);
  const submitRef = useRef(null);

  // Destructure formData for easy use
  const { name, email, password, password2 } = formData;

  // Set form on load, determine focus after form determined, clear form data on unmount
  useEffect(() => {
    match.url.includes('login') ? setForm('login') : setForm('register');
    form === 'register' ? nameRef.current.focus() : emailRef.current.focus();
    return setData({
      name: '',
      email: '',
      password: '',
      password2: ''
    })
  }, [match.url, form]);

  const onChange = e => setData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    let alerts = 0;
    if (form === 'register' && (password !== password2 || password === '')) {
      setAlert('Passwords do not match.', 'danger');
      alerts++;
    }
    if (form === 'register' && !isNameValid(name)) {
      setAlert('Please enter a full name with letters A-Z and only characters . , \' , or -', 'danger');
      alerts++
    }
    if (!isEmailValid(email)) {
      setAlert('Please enter a valid email address longer than 6 characters', 'danger');
      alerts++;
    }
    if (form === 'register' && alerts === 0) {
      register({ name, email, password });
    } else if (form === 'login' && alerts === 0) {
      login(email, password);
    }
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      switch (e.target.name) {
        case 'name':
          emailRef.current.focus();
          break;
        case 'email':
          passwordRef.current.focus();
          break;
        case 'password':
          form === 'register' ? password2Ref.current.focus() : submitRef.current.focus();
          break;
        case 'password2':
          submitRef.current.focus();
          break;
        default:
          break;
      }
    }
  }

  // Render based upon form type
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

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  // Labels based upon form - TODO: Translations - en-US, fr-CA, es-MX -set user prefs?
  const buttonLabel = form === 'register' ? 'Register' : 'Log In';
  const sign = form === 'register' ? 'Sign Up' : 'Sign In';
  const header = form === 'register' ? 'Create Your Account' : 'Sign In To Your Account';

  return (
    <>
      <h1 className="large text-primary">{sign}</h1>
      <p className="lead"><i className="fas fa-user"></i> {header}</p>
      <form className="form" onSubmit={(e) => { onSubmit(e) }}>
        {form === 'register' &&
          <Input
            type="text"
            placeholder="Name"
            name="name"
            autoComplete="name"
            value={name}
            onChange={e => onChange(e)}
            onKeyDown={onKeyDown}
            required
            ref={nameRef}
          />
        }
        <Input
          type="email"
          placeholder="Email Address"
          name="email"
          autoComplete="email"
          onChange={e => onChange(e)}
          onKeyDown={onKeyDown}
          value={email}
          ref={emailRef}
          showText={form === 'register'}
          formText={'This site uses Gravatar so if you want a profile image, use a Gravatar email'}
        />
        <Input
          type="password"
          autoComplete={form === 'register' ? 'new-password' : 'password'}
          placeholder="Password"
          name="password"
          onChange={e => onChange(e)}
          onKeyDown={onKeyDown}
          value={password}
          minLength="6"
          ref={passwordRef}
        />
        {form === 'register' &&
          <Input
            type="password"
            placeholder="Confirm Password"
            autoComplete={form === 'register' ? 'new-password' : 'password'}
            name="password2"
            onChange={e => onChange(e)}
            onKeyDown={onKeyDown}
            value={password2}
            minLength="6"
            ref={password2Ref}
          />
        }
        <button type="submit" disabled style={{ display: 'none' }} />
        <Input type='submit' name="submit" className='btn btn-primary' ref={submitRef} value={buttonLabel} />
      </form>
      {renderCallToAction()}
    </>
  );
};

Register.propTypes = {
  isAuthenticated: PropTypes.bool,
  setAlert: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired
};

const mapStateToProps = ({ auth }) => ({
  isAuthenticated: auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register, login })(Register);