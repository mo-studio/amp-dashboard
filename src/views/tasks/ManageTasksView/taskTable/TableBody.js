import React from 'react';
import PropTypes from 'prop-types';
import {
  TableBody as MuiTableBody,
  TableRow,
  TableCell,
  Button,
} from '@material-ui/core/';

const TableBody = ({ tableData, classes, handleViewTask }) => (
  <MuiTableBody>
    {tableData.map((task) => (
      <TableRow key={task.id}>
        <TableCell component="th" scope="row">
          {task.title}
        </TableCell>
        <TableCell>{task.office}</TableCell>
        <TableCell>{task.pocName}</TableCell>
        <TableCell>{task.verificationRequired ? 'Yes' : ''}</TableCell>
        <TableCell align="center">
          <Button
            size="small"
            color="secondary"
            className={classes.viewButton}
            onClick={() => handleViewTask(task)}
          >
            View
          </Button>
        </TableCell>
      </TableRow>
    ))}
  </MuiTableBody>
);
export default TableBody;

TableBody.propTypes = {
  tableData: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  handleViewTask: PropTypes.func.isRequired,
};
