import React from 'react';

// basic component to expand upon later
const Form = (props) => {
  const { className, onSubmit, children } = props;
  return (
    <form
      className={className}
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
};

export default Form;