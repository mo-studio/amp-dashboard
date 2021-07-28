import React from 'react';
import PropTypes from 'prop-types';
import { DialogTitle, Typography } from '@material-ui/core';

const ModalTitle = ({ status, idleState, loadingState, errorState }) => (
  <DialogTitle disableTypography>
    <Typography variant="h5">
      {status === 'idle' && idleState}
      {status === 'pending' && loadingState}
    </Typography>
  </DialogTitle>
);

export default ModalTitle;

ModalTitle.propTypes = {
  status: PropTypes.string.isRequired,
  idleState: PropTypes.string.isRequired,
  loadingState: PropTypes.string,
  errorState: PropTypes.string,
};
