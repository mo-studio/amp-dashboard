import React from 'react';
import { makeStyles, Table, TableContainer } from '@material-ui/core/';
import PropTypes from 'prop-types';
import FilterForm from './FilterForm';
import { useForm } from '../../../../components/hooks/useForm';
import Loading from '../../../../components/Loading';
import TableHead from './TableHead';
import TableBody from './TableBody';

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

const TaskTable = ({ state, actions }) => {
  const { values, handleInputChange, resetForm } = useForm({
    taskLevel: '',
    officeFilter: '',
    verificationFilter: '',
  });
  const classes = useStyles();

  const filterTableData = () => {
    let taskArray = [];
    if (values.taskLevel === '') {
      state.categories.map((x) => {
        x.tasks.map((t) => taskArray.push(t));
        return x;
      });
    } else {
      state.categories.map((item) => {
        if (item.ownerID === values.taskLevel) {
          taskArray = [...taskArray, ...item.tasks];
        }
        return taskArray;
      });
    }
    if (values.officeFilter !== '') {
      taskArray = taskArray.filter((x) => x.office === values.officeFilter);
    }
    if (values.verificationFilter === 'Yes') {
      taskArray = taskArray.filter((x) => x.verificationRequired === true);
    }
    if (values.verificationFilter === 'No') {
      taskArray = taskArray.filter((x) => x.verificationRequired === false);
    }
    return taskArray;
  };

  const handleViewTask = (task) => {
    actions.setSelectedTask(task);
    actions.toggleTaskDetail();
  };

  const tableData = filterTableData();

  const { categories, units, offices } = state;
  return categories && units && offices ? (
    <>
      <FilterForm
        state={state}
        values={values}
        resetForm={resetForm}
        tableData={tableData}
        onChange={handleInputChange}
      />
      <TableContainer className={classes.container}>
        <Table className={classes.table} aria-label="task-table">
          <TableHead
            headers={[
              'Task Title',
              'Office',
              'Point of Contact',
              'Verification Required',
              'Details',
            ]}
          />
          <TableBody
            classes={classes}
            tableData={tableData}
            handleViewTask={handleViewTask}
          />
        </Table>
      </TableContainer>
    </>
  ) : (
    <Loading />
  );
};

export default TaskTable;

TaskTable.propTypes = {
  state: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};
