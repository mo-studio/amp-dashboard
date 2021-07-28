import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    margin: '0 auto',
    '& .MuiCircularProgress-root': {
      display: 'flex',
    },
  },
});

const Loading = ({ color }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CircularProgress color={color || 'secondary'} />
    </div>
  );
};

Loading.propTypes = {
  color: PropTypes.string,
};

export default Loading;
