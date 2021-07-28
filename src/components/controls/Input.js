import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';

export default function Input({
  name,
  label,
  value,
  onChange,
  multiline,
  rows,
  variant,
  color,
  error = null,
}) {
  return !multiline ? (
    <TextField
      variant={variant || 'outlined'}
      color={color || 'primary'}
      label={label}
      value={value}
      name={name}
      onChange={onChange}
      {...(error && { error: true, helperText: error })}
    />
  ) : (
    <TextField
      variant={variant || 'outlined'}
      label={label}
      value={value}
      name={name}
      multiline
      rows={rows || 4}
      onChange={onChange}
      {...(error && { error: true, helperText: error })}
    />
  );
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
  variant: PropTypes.string,
  multiline: PropTypes.bool,
  rows: PropTypes.number,
  error: PropTypes.string,
};
