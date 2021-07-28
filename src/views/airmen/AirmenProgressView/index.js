import React, { useReducer, useEffect } from 'react';
import { Container, makeStyles } from '@material-ui/core';
import Page from '../../../components/Page';
import AirmanData from './AirmanData';
import * as airmanService from '../../../services/airmanService';
import reducer, { initialState, mapDispatch } from '../reducer';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'theme.palette.background.dark',
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
    '& .MuiContainer-root': {
      display: 'flex',
      paddingLeft: '0',
      paddingRight: 0,
    },
    '& .MuiGrid-container': {
      paddingRight: '10px',
      paddingLeft: '10px',
    },
  },
}));

const AirmanListView = () => {
  const classes = useStyles();

  const [state, dispatch] = useReducer(reducer, initialState);
  const actions = mapDispatch(dispatch);

  const updateState = (data) => {
    actions.setAirmenAndProgress(data[0]);
    actions.setMonths(data[1]);
  };

  useEffect(() => {
    airmanService.getAirmenAndProgress().then(
      (data) => updateState(data),
      (error) => {
        console.log(error);
      }
    );
  }, [state.triggerRender]);

  return (
    <Page className={classes.root} title="Airmen Progress">
      <Container maxWidth={false}>
        <AirmanData state={state} actions={actions} />
      </Container>
    </Page>
  );
};

export default AirmanListView;
