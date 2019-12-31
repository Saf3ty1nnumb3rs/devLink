import React from 'react';
import PropTypes from 'prop-types';

function NotFound(props) {
  const page = props.location.pathname.slice(1, props.location.pathname.length);
  console.log(page)
  return (
    <>
      <h1 className="x-large text-primary">
        <i className="fas fa-exclamation-triangle"></i> Page Not Found
      </h1>
      <p className="Large">{`The page "${page}" does not exist.`}</p>
    </>
  );
}

NotFound.propTypes = {
  location: PropTypes.object.isRequired,
};

export default NotFound;