import React from 'react';
import PropTypes from 'prop-types';
import { Drawer, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    position: 'absolute',
  },
});

const SlideOut = ({ anchor, isOpen, onClose, children }) => {
  const classes = useStyles();
  return (
    <Drawer
      className={classes.root}
      anchor={anchor || 'right'}
      open={isOpen}
      onClose={onClose}
      ModalProps={{ disableBackdropClick: true }}
    >
      {children}
    </Drawer>
  );
};

export default SlideOut;

SlideOut.propTypes = {
  anchor: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  children: PropTypes.any,
};
