import React from 'react';
import { Grid, Container, makeStyles } from '@material-ui/core';
import Page from '../../../components/Page';
import ChecklistProgress from './ChecklistProgress';
import TotalAirmen from './TotalAirmen';
import TaskProgress from './TaskProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const Dashboard = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Dashboard">
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item lg={6} sm={6} xl={6} xs={12}>
            <TotalAirmen />
          </Grid>
          <Grid item lg={6} sm={6} xl={6} xs={12}>
            <ChecklistProgress />
          </Grid>
          <Grid item lg={4} md={6} xl={3} xs={12}>
            <TaskProgress />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Dashboard;
