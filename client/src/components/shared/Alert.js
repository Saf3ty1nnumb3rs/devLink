import React from 'react';
import PropTypes from 'prop-types';

const Alert = ({ alertType, msg }) => {
  const icon = (value) => {
    switch (value) {
      case 'danger':
        return <i className="fas fa-book-dead fa-2x"></i>;
      case 'success':
        return <i className="fas fa-rocket fa-2x"></i>;
      case 'primary':
        return <i className="far fa-question-circle fa-2x"></i>;
      case 'dark':
        return <i className="fas fa-anchor fa-2x"></i>;
      default:
        break;
    }
  };
  return (
    <div className={`alert alert-${alertType} lean`}>
      {msg}
      {icon(alertType)}
    </div>
  );
};

Alert.propTypes = {
  id: PropTypes.string.isRequired,
  alertType: PropTypes.string.isRequired,
}
export default Alert;