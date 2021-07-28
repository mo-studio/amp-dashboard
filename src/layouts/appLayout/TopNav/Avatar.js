import React from 'react';
import {
  Grid,
  Avatar as MuiAvatar,
  Typography,
  makeStyles,
} from '@material-ui/core';
import PropTypes from 'prop-types';

import getInitials from '../../../utils/getInitials';

const useStyles = makeStyles({
  root: {},
  headerName: {
    color: 'black',
    marginRight: '10px',
  },
});

export default function Avatar({ name }) {
  const classes = useStyles();

  return (
    <>
      <Grid item>
        <Typography className={classes.headerName} variant="body1">
          {name}
        </Typography>
      </Grid>
      <Grid item>
        <MuiAvatar>{getInitials(name)}</MuiAvatar>
      </Grid>
    </>
  );
}

Avatar.propTypes = {
  name: PropTypes.string.isRequired,
};
