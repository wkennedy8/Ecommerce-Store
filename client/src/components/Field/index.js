import React from 'react';
import './Field.scss';

const Field = ({
  label,
  id,
  type,
  placeholder,
  required,
  autoComplete,
  value,
  onChange,
  name
}) => (
  <div className="form-row">
    <label htmlFor={id} className="form-row-label">
      {label}
    </label>
    <input
      className="form-row-input"
      id={id}
      type={type}
      name={name}
      placeholder={placeholder}
      required={required}
      autoComplete={autoComplete}
      value={value}
      onChange={onChange}
    />
  </div>
);

export default Field;
