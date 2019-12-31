import React from 'react';
import PropTypes from 'prop-types';


const CircleLoader = (props) => {
  return (
    <div id="wrapper">
      <div className="profile-main-loader">
        <div className="loader">
          <svg
            version="1.1"
            id="L6"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 100 100"
            enableBackground="new 0 0 100 100"
            xmlSpace="preserve"
          >
            <circle className="loader-path" cx="50" cy="50" r="20" fill="none" stroke={props.stroke} strokeWidth="2" />
            <circle className="loader-path" cx="50" cy="50" r="17" fill="none" stroke={props.stroke} strokeWidth="2" />
            <circle className="loader-path" cx="50" cy="50" r="14" fill="none" stroke={props.stroke} strokeWidth="2" />
            <circle className="loader-path" cx="50" cy="50" r="11" fill="none" stroke={props.stroke} strokeWidth="2" />
            <circle className="loader-path" cx="50" cy="50" r="8" fill="none" stroke={props.stroke} strokeWidth="2" />
            <circle className="loader-path" cx="50" cy="50" r="5" fill="none" stroke={props.stroke} strokeWidth="2" />
            <circle className="loader-path" cx="50" cy="50" r="2" fill="none" stroke={props.stroke} strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
};

CircleLoader.propTypes = {
  stroke: PropTypes.string,
};
export default CircleLoader;
