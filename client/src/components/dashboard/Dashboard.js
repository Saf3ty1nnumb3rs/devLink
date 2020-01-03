import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';
import CircleLoader from '../shared/CircleLoader';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';

const Dashboard = ({ auth: { user }, profile: { profile, loading }, getCurrentProfile, deleteAccount }) => {
  useEffect(() => {
    getCurrentProfile()
  }, [getCurrentProfile]);
  return loading && profile === null ? <CircleLoader /> : (
    <>
      <h1 className="large text-primary">
        Dashboard
      </h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome {user && user.name}
      </p>
      {profile ? (
        <>
          <DashboardActions />
          <Experience experience={profile.experience} />
          <Education education={profile.education} />

          <div className='my-2'>
            <button className='btn btn-danger' onClick={() => deleteAccount()}>
              <i className='fas fa-user-minus' /> Delete My Account
            </button>
          </div>
        </>
      ) : (
          <>
            <p>You have not yet set up a profile, please add some info</p>
            <Link to='/create-profile' className="btn btn-primary my-1">
              Create Profile
          </Link>
          </>
        )}
    </>
  );
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
})
export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);