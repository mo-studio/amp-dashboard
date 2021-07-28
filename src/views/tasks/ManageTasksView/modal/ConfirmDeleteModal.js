import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog as MuiDialog,
  makeStyles,
  DialogContentText,
  DialogContent,
} from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import ModalTitle from './ModalTitle';
import ModalActions from './ModalActions';
import * as taskService from '../../../../services/taskService';

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

const ConfirmDeleteModal = ({ state, actions }) => {
  const handleCancelClicked = () => {
    actions.toggleConfirmDeleteModal();
  };

  const handleYesClicked = () => {
    const targetIndex = taskService.findIndexOfTaskCategory(
      state.selectedTask.categoryID,
      state.categories
    );
    actions.toggleTaskDetail();
    actions.toggleConfirmDeleteModal();
    actions.lazyDeleteTask({
      taskID: state.selectedTask.id,
      categoryID: state.selectedTask.categoryID,
      targetIndex,
    });
    actions.toggleTaskSnackbar();
  };
  const classes = useStyles();
  return (
    <MuiDialog className={classes.root} open={state.showConfirmDeleteModal}>
      <ModalTitle status={state.status} idleState="Are you sure?" />
      <DialogContent>
        <HighlightOffIcon color="secondary" fontSize="large" />
        <DialogContentText>
          Click yes to delete this task: <br /> "{state.selectedTask.title}"
        </DialogContentText>
      </DialogContent>
      <ModalActions
        status={state.status}
        leftButtonProps={{ onClick: handleCancelClicked, text: 'Cancel' }}
        rightButtonProps={{ onClick: handleYesClicked, text: 'Yes' }}
      />
    </MuiDialog>
  );
};

export default ConfirmDeleteModal;

ConfirmDeleteModal.propTypes = {
  state: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};
