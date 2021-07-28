import React from 'react';
import PropTypes from 'prop-types';
import { Box, IconButton, makeStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  root: {
    marginRight: '40px',
  },
  importButton: {
    marginRight: theme.spacing(1),
  },
  exportButton: {
    marginRight: theme.spacing(1),
  },
}));

const Toolbar = ({ className, handleOpen, ...rest }) => {
  const classes = useStyles();

  return (
    <div className={classes.root} {...rest}>
      <Box display="flex" justifyContent="flex-end">
        <IconButton onClick={handleOpen} color="secondary" variant="contained">
          <AddIcon fontSize="large" color="secondary" />
        </IconButton>
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string,
  handleOpen: PropTypes.func.isRequired,
};

export default Toolbar;
