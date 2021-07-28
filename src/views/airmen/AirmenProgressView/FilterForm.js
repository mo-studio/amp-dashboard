import React from 'react';
import { Grid, makeStyles, Paper, Typography, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import Controls from '../../../components/controls/Controls';
import * as airmanService from '../../../services/airmanService';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: '300px',
    '& .MuiButton-root': {
      transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    },
  },
  form: {
    padding: '15px 15px 15px 30px',
    '& .MuiFormControl-root': {
      width: '100%',
      margin: '20px 0',
    },
    '& .MuiTypography-root': {},
    '& .MuiTypography-body1': {
      color: '#757575',
    },
    '& .MuiDivider-root': {
      margin: theme.spacing(1),
    },
  },
  button: {
    margin: '8px 0',
  },
  buttonHidden: {
    transform: 'scale(.7)',
    opacity: '0',
  },
}));

const FilterForm = ({ values, onChange, tableData, resetForm, state }) => {
  const showResetButton = () => {
    if (
      values.monthStarted !== '' ||
      values.firstDutyStation !== '' ||
      values.alerts !== ''
    ) {
      return true;
    }
    return false;
  };
  const classes = useStyles();
  return (
    tableData &&
    state.months && (
      <Paper elevation={0} square className={classes.root}>
        <form className={classes.form}>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="h5">Filter</Typography>
            </Grid>
            <Grid item xs={12}>
              <Controls.Select
                label="Month Started"
                value={values.monthStarted}
                name="monthStarted"
                variant="standard"
                onChange={onChange}
                options={state.months}
                defaultNone
                placeholder="All"
              />
            </Grid>
            <Grid item xs={12}>
              <Controls.Select
                label="First Duty Station/PCS"
                variant="standard"
                value={values.firstDutyStation}
                name="firstDutyStation"
                onChange={onChange}
                options={airmanService.getFirstDutyStationOptions()}
                defaultNone
                placeholder="All"
              />
            </Grid>
            <Grid item xs={12}>
              <Controls.Select
                label="Alerts"
                value={values.alerts}
                name="alerts"
                variant="standard"
                onChange={onChange}
                options={airmanService.getAlerts()}
                defaultNone
                placeholder="All"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                size="small"
                className={
                  showResetButton() ? classes.button : classes.buttonHidden
                }
                onClick={resetForm}
              >
                Reset
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    )
  );
};

FilterForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
  tableData: PropTypes.array.isRequired,
  resetForm: PropTypes.func.isRequired,
};

export default FilterForm;
