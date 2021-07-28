import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Typography,
  Divider,
  Button,
  makeStyles,
  IconButton,
} from '@material-ui/core';
import { Edit as EditIcon, Delete as DeleteIcon } from '@material-ui/icons/';
import { Form } from '../../../../components/hooks/useForm';

const useStyles = makeStyles({
  root: {
    justifyItems: 'center',
    '& .MuiDivider-root': {
      width: '100%',
    },
  },
});

export default function TaskDetail({ state, actions }) {
  const classes = useStyles();
  const handleEditClicked = () => {
    actions.setEditModeOn();
    actions.toggleTaskDetail();
    actions.toggleTaskForm();
  };
  const handleDeleteClicked = () => {
    actions.toggleConfirmDeleteModal();
  };
  const { selectedTask } = state;
  return (
    <Form>
      <Grid container className={classes.root}>
        <Grid container alignItems="center" justify="space-between">
          <Grid item xs={9}>
            <Typography variant="h3">Task Detail</Typography>
          </Grid>
          <Grid item xs={3}>
            <IconButton onClick={handleEditClicked}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => handleDeleteClicked()}>
              <DeleteIcon />
            </IconButton>
          </Grid>
          <Divider />
        </Grid>
        <Grid item xs={12} sm={8} md={8}>
          <Typography variant="body1">Task Title</Typography>
          <Typography variant="h6">{selectedTask.title}</Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Typography variant="body1">Description</Typography>
          <Typography variant="h6">{selectedTask.text}</Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Typography variant="body1">Point of Contact</Typography>
          <Typography variant="h6">{selectedTask.pocName}</Typography>
          <Typography variant="h6">{selectedTask.pocEmail}</Typography>
          <Typography variant="h6">{selectedTask.pocPhoneNumber}</Typography>
        </Grid>
        <Grid item xs={12} sm={8} md={8}>
          <Typography variant="body1">First Duty Station</Typography>
          <Typography variant="h6">
            {selectedTask.isFirstDutyStation ? 'Yes' : 'No'}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Typography variant="body1">First Term Airman Only</Typography>
          <Typography variant="h6">
            {selectedTask.isFirstTermAirman ? 'Yes' : 'No'}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Typography variant="body1">Officer Only</Typography>
          <Typography variant="h6">
            {selectedTask.isOfficer ? 'Yes' : 'No'}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Typography variant="body1">Verification Required</Typography>
          <Typography variant="h6">
            {selectedTask.verificationRequired ? 'Yes' : 'No'}
          </Typography>
        </Grid>
        <Grid
          container
          className="form-button-container"
          justify="space-around"
          alignItems="center"
        >
          <Grid item>
            <Button onClick={actions.toggleTaskDetail}>Exit</Button>
          </Grid>
        </Grid>
      </Grid>
    </Form>
  );
}

TaskDetail.propTypes = {
  state: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};
