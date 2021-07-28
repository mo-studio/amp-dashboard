import React from 'react';
import PropTypes from 'prop-types';
import {
  Select as MuiSelect,
  FormControl,
  MenuItem,
  InputLabel,
  FormHelperText,
} from '@material-ui/core';

export default function Select({
  name,
  label,
  value,
  onChange,
  variant,
  options,
  defaultNone,
  placeholder,
  color,
  disabled,
  error = null,
}) {
  return (
    <FormControl
      variant={variant || 'outlined'}
      {...(error && { error: true })}
      {...(disabled && { disabled: true })}
    >
      <InputLabel
        {...(placeholder && { shrink: true })}
        htmlFor={`${name}-label-placeholder`}
      >
        {label}
      </InputLabel>
      <MuiSelect
        name={name}
        value={value}
        onChange={onChange}
        label={label}
        displayEmpty={!!placeholder}
        id={`${name}-label-placeholder`}
        color={color || 'primary'}
      >
        {defaultNone && <MenuItem value="">{placeholder}</MenuItem>}

        {options.map((item, index) => (
          <MenuItem key={index} value={item.id}>
            {item.title}
          </MenuItem>
        ))}
      </MuiSelect>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
}

Select.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
  variant: PropTypes.string,
  defaultNone: PropTypes.bool,
  disabled: PropTypes.bool,
  options: PropTypes.any,
  error: PropTypes.string,
  placeholder: PropTypes.string,
  color: PropTypes.string,
};
