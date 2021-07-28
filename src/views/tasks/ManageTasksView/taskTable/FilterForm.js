import React from 'react';
import { Grid, makeStyles, Paper, Typography, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import Controls from '../../../../components/controls/Controls';
import * as taskService from '../../../../services/taskService';

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
    const { officeFilter, taskLevel, verificationFilter } = values;
    return officeFilter !== '' || taskLevel !== '' || verificationFilter !== '';
  };

  const classes = useStyles();
  return (
    tableData &&
    state.units && (
      <Paper elevation={0} square className={classes.root}>
        <form className={classes.form}>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="h5">Filter</Typography>
            </Grid>
            <Grid item xs={12}>
              <Controls.Select
                label="Base or Squadron Task"
                value={values.taskLevel}
                name="taskLevel"
                variant="standard"
                onChange={onChange}
                options={taskService.formatUnitDropdownOptions(state.units)}
                defaultNone
                placeholder="All"
              />
            </Grid>
            <Grid item xs={12}>
              <Controls.Select
                label="Office"
                variant="standard"
                value={values.officeFilter}
                name="officeFilter"
                onChange={onChange}
                options={taskService.onlyShowRelevantOffices(
                  tableData,
                  state.offices
                )}
                defaultNone
                placeholder="All"
              />
            </Grid>
            <Grid item xs={12}>
              <Controls.Select
                label="Verification Required"
                value={values.verificationFilter}
                name="verificationFilter"
                variant="standard"
                onChange={onChange}
                options={taskService.getVerificationFilterOptions()}
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
