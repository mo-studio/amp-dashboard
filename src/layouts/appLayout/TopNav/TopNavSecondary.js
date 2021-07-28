import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Paper } from '@material-ui/core';
import NavItem from './NavItem';

const TopNavSecondary = ({ classes }) => (
  <div>
    <Paper className={classes.secondaryBar} elevation={0}>
      <Grid container alignContent="center">
        <Grid item sm={3} md={2}>
          <NavItem href="/app/tasks" title="Manage Tasks" />
        </Grid>
        <Grid item sm={3} md={2}>
          <NavItem href="/app/airmen" title="Airmen Progress" />
        </Grid>
        <Grid item sm={3} md={2}>
          <NavItem href="/app/verifications" title="Verifications" />
        </Grid>
        <Grid item md={8} />
      </Grid>
    </Paper>
  </div>
);

TopNavSecondary.propTypes = {
  classes: PropTypes.object,
};

export default TopNavSecondary;
