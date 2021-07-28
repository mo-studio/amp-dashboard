import React from 'react';
import PropTypes from 'prop-types';
import {
  Snackbar as MuiSnackbar,
  Button,
  IconButton,
} from '@material-ui/core/';
import CloseIcon from '@material-ui/icons/Close';

const Snackbar = ({
  vertical = 'bottom',
  horizontal = 'left',
  open,
  onClose,
  message,
  button: { text, onClick },
}) => (
  <div>
    <MuiSnackbar
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      onClose={onClose}
      message={message}
      action={
        <>
          {text && (
            <Button color="secondary" size="small" onClick={onClick}>
              {text}
            </Button>
          )}

          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={onClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </>
      }
    />
  </div>
);

Snackbar.propTypes = {
  vertical: PropTypes.string,
  horizontal: PropTypes.string,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  text: PropTypes.string,
  button: PropTypes.object,
  onClick: PropTypes.func,
  message: PropTypes.string.isRequired,
};

export default Snackbar;
