import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/authActions';

const Navbar = ({ isAuthenticated, loading, logout }) => {
  window.onscroll = () => {
    let currentScrollPos = window.pageYOffset;
    if (currentScrollPos < 62) {
      document.getElementById("nav-header").style.top = "0";
    } else {
      document.getElementById("nav-header").style.top = "-62px";
    }
  };

  const authLinks = (
    <ul>
      <li>
        <Link to='/dashboard'>
          <i className="fas fa-user"></i>{' '}
          <span className="hide-sm">Dashboard</span>
        </Link>
      </li>
      <li>
        <a onClick={() => logoutReturn()} href="#!">
          <i className="fas fa-sign-out-alt"></i>{' '}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul>
      <li><Link to="profiles.html">Developers</Link></li>
      <li><Link to="/register">Register</Link></li>
      <li><Link to="/login">Login</Link></li>
    </ul>
  );
  const logoutReturn = async () => {
    await logout();
    return <Redirect to="/" />;
  };
  const links = !loading && (<>{isAuthenticated ? authLinks : guestLinks}</>);
  const home = (<>{isAuthenticated ? <Link to="/dashboard"><i className="fas fa-code"></i> DevLink</Link> : <Link to="/"><i className="fas fa-code"></i> DevLink</Link>}</>);
  return (
    <nav id="nav-header" className="navbar bg-dark">
      <h1>
        {home}
      </h1>
      {links}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = ({ auth }) => ({
  auth,
  isAuthenticated: auth.isAuthenticated,
  loading: auth.loading
});
export default connect(mapStateToProps, { logout })(Navbar);