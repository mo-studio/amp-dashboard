import React from 'react';
import PropTypes from 'prop-types';
import { Dialog as MuiDialog, makeStyles } from '@material-ui/core';
import ModalTitle from './ModalTitle';
import ModalContent from './ModalContent';
import ModalActions from './ModalActions';

const useStyles = makeStyles({
  root: {
    '& .MuiPaper-root': {
      width: '400px',
      minHeight: '200px',
      borderRadius: '10px',
    },
    '& .MuiDialogTitle-root': {
      padding: '24px 24px 22px 83px',
    },
    '& .MuiDialogContent-root': {
      display: 'flex',
      maxHeight: '100px',
      alignItems: 'center',
    },
    '& .MuiDialogContentText-root': {
      marginBottom: 0,
    },
    '& .MuiTypography-body1': {
      fontSize: '.9rem',
      paddingLeft: '24px',
      paddingRight: '20px',
    },
    '& .MuiDialogActions-root': {
      minHeight: '67px',
      justifyContent: 'center',
      paddingBottom: '24px',
      paddingTop: '13px',
    },
    '& .MuiButton-root': {
      textTransform: 'none',
      width: '90px',
      color: 'white',
    },
  },
  loading: {
    display: 'flex',
    height: '100%',
    width: '100%',
    alignItems: 'center',
  },
});

const TaskModal = ({ state, actions }) => {
  const handleViewClicked = () => {
    actions.toggleTaskModal();
    actions.toggleTaskDetail();
  };
  const classes = useStyles();
  return (
    <MuiDialog className={classes.root} open={state.showTaskModal}>
      <ModalTitle
        status={state.status}
        idleState="Your Task was saved!"
        loadingState="Just a minute.."
      />
      <ModalContent status={state.status} />
      <ModalActions
        status={state.status}
        leftButtonProps={{ onClick: handleViewClicked, text: 'View' }}
        rightButtonProps={{ onClick: actions.toggleTaskModal, text: 'Done' }}
      />
    </MuiDialog>
  );
};

export default TaskModal;

TaskModal.propTypes = {
  state: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};
