import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/Register';
import Alert from '../shared/Alert';
import Dashboard from '../dashboard/Dashboard';
import CreateEditProfile from '../profile-form/CreateEditProfile';
import AddExperience from '../profile-form/AddExperience';
import AddEducation from '../profile-form/AddEducation';
import Profiles from '../profiles/Profiles';
import Profile from '../profile/Profile';
import Posts from '../posts/Posts';
import Post from '../post/Post';
import NotFound from '../layout/NotFound';
import PrivateRoute from '../routing/PrivateRoute';

const Routes = ({ alerts }) => {

  const renderAlerts = alerts => (
    <div className="alert box">
      {alerts.map(({ id, alertType, msg }) => <Alert key={id} id={id} alertType={alertType} msg={msg} />)}
    </div>
  )

  return (
    <>
      {alerts && alerts !== null && alerts.length > 0 && renderAlerts(alerts)}
      <section className='container'>
        <Switch>
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Register} />
          <Route exact path='/profiles' component={Profiles} />
          <Route exact path='/profile/:id' component={Profile} />
          <PrivateRoute exact path='/dashboard' component={Dashboard} />
          <PrivateRoute exact path='/create-profile' component={CreateEditProfile} />
          <PrivateRoute exact path='/edit-profile' component={CreateEditProfile} />
          <PrivateRoute exact path='/add-experience' component={AddExperience} />
          <PrivateRoute exact path='/add-education' component={AddEducation} />
          <PrivateRoute exact path='/posts' component={Posts} />
          <PrivateRoute exact path='/posts/:id' component={Post} />
          <Route component={NotFound} />
        </Switch>
      </section>
    </>
  );
};

Routes.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = ({ alerts }) => ({
  alerts
});

export default connect(mapStateToProps)(Routes);