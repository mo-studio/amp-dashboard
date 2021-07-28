import React from 'react';
import PropTypes from 'prop-types';
import { Switch as MuiSwitch, Typography, Grid } from '@material-ui/core';

export default function Switch({ name, value, onChange, size, color }) {
  return (
    <>
      <Typography component="div">
        <Grid
          component="label"
          container
          alignItems="center"
          justify="flex-start"
          spacing={1}
        >
          <Grid item>No</Grid>
          <Grid item>
            <MuiSwitch
              checked={value}
              onChange={onChange}
              name={name}
              size={size}
              color={color || 'primary'}
            />
          </Grid>
          <Grid item>Yes</Grid>
        </Grid>
      </Typography>
    </>
  );
}

Switch.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  size: PropTypes.string,
  color: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
