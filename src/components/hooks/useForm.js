import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';

export function useForm(initialValues, validateOnChange = false, validate) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    if (validateOnChange) {
      validate({ [name]: value });
    }
  };

  const handleSwitchChange = (e) => {
    const { name, checked } = e.target;
    setValues({
      ...values,
      [name]: checked,
    });
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
  };
  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    handleSwitchChange,
    resetForm,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '600px',
    padding: '10px 30px',
    height: '100%',
    '& .MuiGrid-container': {
      marginTop: '5px',
    },
    '& .MuiFormControl-root': {
      width: '100%',
      margin: '10px 0',
    },
    '& .MuiTypography-root': {
      margin: theme.spacing(1),
    },
    '& .MuiDivider-root': {
      margin: theme.spacing(1),
    },
    '& .form-button-container': {
      marginTop: '40px',
      height: '60px',
    },
  },
}));

export function Form({ children, ...other }) {
  const classes = useStyles();
  return (
    <form {...other} className={classes.root}>
      {children}
    </form>
  );
}

Form.propTypes = {
  children: PropTypes.any,
};
