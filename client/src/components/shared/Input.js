import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';


const Input = forwardRef(({
  header,
  disabled,
  icon,
  type,
  className,
  formClass,
  placeholder,
  name,
  value,
  onChange,
  onKeyDown,
  required,
  autoComplete,
  minLength,
  formText,
  showText
},
ref
) => (
<div className={`form-group ${formClass}`}>
  {icon && icon}
  {header && <h4>{header}</h4>}
  <input
    className={className}
    type={type}
    placeholder={placeholder}
    name={name}
    value={value}
    onChange={onChange}
    onKeyDown={onKeyDown}
    required={required}
    autoComplete={autoComplete}
    minLength={minLength}
    ref={ref}
    disabled={disabled}
  />
  {formText && showText &&
    <small className="form-text">
      {formText}
    </small>}
</div>));

Input.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.element,
  formClass: PropTypes.string,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  showText: PropTypes.bool,
  required: PropTypes.bool,
  autoComplete: PropTypes.string,
  minLength: PropTypes.string
}

Input.defaultProps = {
  className: '',
  icon: null,
  formClass: '',
  placeholder: '',
  onKeyDown: () => { },
  onChange: () => { },
  name: '',
  value: '',
  showText: false,
  required: false,
  autoComplete: 'off',
  minLength: '0'

}
export default Input;