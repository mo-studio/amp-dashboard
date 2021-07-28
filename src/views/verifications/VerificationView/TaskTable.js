import React from 'react';
import { makeStyles, Button } from '@material-ui/core/';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

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

export default function TaskTable({ tasks, updateTaskProgress }) {
  const classes = useStyles();

  const tableData = tasks;

  return (
    <TableContainer className={classes.container}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Rank</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Date Started</TableCell>
            <TableCell>Task Title</TableCell>
            <TableCell>Task Status</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((task) => (
            <TableRow key={task.key}>
              <TableCell component="th" scope="row">
                {task.rank}
              </TableCell>
              <TableCell>
                {task.userFirstName} {task.userLastName}
              </TableCell>
              <TableCell>{task.createdAt.slice(0, 10)}</TableCell>
              <TableCell>{task.taskTitle}</TableCell>
              <TableCell>
                {task.status === 'pendingVerification'
                  ? 'Verification Pending'
                  : 'In Progress'}
              </TableCell>
              <TableCell align="center">
                <Button
                  size="small"
                  color="secondary"
                  className={classes.viewButton}
                  onClick={() =>
                    updateTaskProgress(task.userID, task.taskID, task)
                  }
                >
                  Verify
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

TaskTable.propTypes = {
  tasks: PropTypes.array.isRequired,
  updateTaskProgress: PropTypes.func.isRequired,
};
