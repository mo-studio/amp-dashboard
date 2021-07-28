import React from 'react';
import {
  Box,
  Button,
  Container,
  Typography,
  makeStyles,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import Page from '../../../components/Page';
import AirmanTaskList from './AirmanTaskList';
import DetailContainer from '../../tasks/ManageTasksView/taskDetail/DetailContainer';
import SlideOut from '../../../components/SlideOut';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'fff',
    minHeight: '100%',
    paddingRight: theme.spacing(3),
    paddingLeft: theme.spacing(3),
  },
  table: {
    display: 'block',
    backgroundcolor: 'red',
  },
}));

const AirmanView = ({ state, handleViewAirman, handleViewTask, actions }) => {
  const classes = useStyles();
  const airman = state.selectedAirman;

  return (
    <Page className={classes.root} title="Airman Progress">
      <Button
        color="secondary"
        className={classes.viewButton}
        onClick={handleViewAirman}
      >
        Return to All Airmen
      </Button>
      <Container maxWidth={false}>
        <Box ml={2} mt={2} mb={4} width={1}>
          <Typography variant="h3">
            {airman.rank} {airman.lastName} {airman.firstName}'s Tasks
          </Typography>
          <Typography>
            Date Started: <b>{airman.startDate}</b>
            <br />
            Percent Completed: <b>{airman.completed}%</b>
          </Typography>
        </Box>
      </Container>
      <AirmanTaskList
        state={state}
        actions={actions}
        className={classes.table}
        userID={airman.id}
        handleViewTask={handleViewTask}
      />
      <SlideOut isOpen={state.showTaskDetail}>
        <DetailContainer state={state} actions={actions} />
      </SlideOut>
    </Page>
  );
};

export default AirmanView;

AirmanView.propTypes = {
  state: PropTypes.object,
  actions: PropTypes.object,
  handleViewAirman: PropTypes.func,
  handleViewTask: PropTypes.func,
};
