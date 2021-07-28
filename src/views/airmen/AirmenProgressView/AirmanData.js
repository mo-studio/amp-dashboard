import React, { useState } from 'react';
import { makeStyles, Button, Table, TableContainer } from '@material-ui/core';
import PropTypes from 'prop-types';
import TableHead from './TableHead';
import TableBody from './TableBody';
import FilterForm from './FilterForm';
import { useForm } from '../../../components/hooks/useForm';
import AirmanView from '../AirmanView';
import * as airmanService from '../../../services/airmanService';

const useStyles = makeStyles({
  container: {
    padding: '0 40px',
  },
  table: {
    minWidth: 650,
    paddingRight: '10px',
  },
  viewButton: {
    textTransform: 'none',
    fontWeight: '500',
  },
});

const AirmanData = ({ state, actions }) => {
  const classes = useStyles();
  const { values, handleInputChange, resetForm } = useForm({
    monthStarted: '',
    firstDutyStation: '',
    alerts: '',
  });

  const filterTableData = () => {
    let airmenArray = [];
    if (values.monthStarted === '') {
      airmenArray = state.airmenAndProgress;
    } else {
      state.airmenAndProgress.map((airman) => {
        if (airman.monthStarted === values.monthStarted) {
          airmenArray.push(airman);
        }
        return airmenArray;
      });
    }

    if (values.firstDutyStation === 1) {
      airmenArray = airmenArray.filter((x) => x.isFirstDutyStation === true);
    }
    if (values.firstDutyStation === 2) {
      airmenArray = airmenArray.filter((x) => x.isFirstDutyStation === false);
    }

    if (values.alerts === 1) {
      airmenArray = airmenArray.filter((x) => x.alerts === '> 30 Days');
    }
    if (values.alerts === 2) {
      airmenArray = airmenArray.filter((x) => x.alerts === '< 10% Complete');
    }
    return airmenArray;
  };

  const handleViewAirman = (airman) => {
    if (airman) {
      actions.setSelectedAirman(airman);
    }
    actions.toggleAirmenProgress();
  };
  const handleViewTask = (task) => {
    actions.setSelectedTask(task);
    actions.toggleTaskDetail();
  };

  const tableData = filterTableData();
  return state.showAirmenProgress ? (
    <>
      <FilterForm
        onChange={handleInputChange}
        values={values}
        resetForm={resetForm}
        state={state}
        tableData={tableData}
      />
      <TableContainer className={classes.container}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead
            headers={[
              'Rank',
              'Name',
              'Alerts',
              'Not Started',
              'In Progress',
              'Pending Verification',
              'Completed',
              'Date Started',
              'Details',
            ]}
          />
          <TableBody
            classes={classes}
            tableData={tableData}
            actions={actions}
            handleViewAirman={handleViewAirman}
          />
        </Table>
      </TableContainer>
    </>
  ) : (
    <>
      <AirmanView
        state={state}
        actions={actions}
        handleViewAirman={handleViewAirman}
        handleViewTask={handleViewTask}
      />
    </>
  );
};

export default AirmanData;

AirmanData.propTypes = {
  state: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};
