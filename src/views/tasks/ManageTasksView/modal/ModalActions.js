import React from 'react';
import PropTypes from 'prop-types';
import { DialogActions, Button } from '@material-ui/core';

const ModalActions = ({ status, leftButtonProps, rightButtonProps }) => (
  <DialogActions>
    {status === 'idle' && (
      <>
        <Button
          variant="contained"
          size="small"
          color="secondary"
          onClick={leftButtonProps.onClick}
        >
          {leftButtonProps.text}
        </Button>
        <Button
          variant="contained"
          size="small"
          color="secondary"
          onClick={rightButtonProps.onClick}
        >
          {rightButtonProps.text}
        </Button>
      </>
    )}
  </DialogActions>
);

export default ModalActions;

ModalActions.propTypes = {
  status: PropTypes.string.isRequired,
  leftButtonProps: PropTypes.object.isRequired,
  rightButtonProps: PropTypes.object,
};
