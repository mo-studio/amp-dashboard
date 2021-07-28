import React from 'react';
import PropTypes from 'prop-types';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import {
  DialogContent,
  DialogContentText,
  CircularProgress,
} from '@material-ui/core';

const ModalContent = ({ status }) => (
  <DialogContent>
    {status === 'idle' && (
      <>
        <CheckCircleIcon color="secondary" fontSize="large" />
        <DialogContentText>
          Your Task has been successfully saved. Click view to see more details.
        </DialogContentText>
      </>
    )}
    {status === 'pending' && (
      <>
        <CircularProgress size={35} color="secondary" />
        <DialogContentText>Your Task is being uploaded now.</DialogContentText>
      </>
    )}
  </DialogContent>
);

export default ModalContent;

ModalContent.propTypes = {
  status: PropTypes.string.isRequired,
};
