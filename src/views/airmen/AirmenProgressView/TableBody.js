import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  TableBody as MuiTableBody,
  TableRow,
  TableCell,
  Button,
} from '@material-ui/core/';

const TableBody = ({ tableData, classes, actions, handleViewAirman }) => (
  <MuiTableBody>
    {tableData.map((airman) => (
      <TableRow key={airman.id}>
        <TableCell component="th" scope="row">
          {airman.rank}
        </TableCell>
        <TableCell>
          {airman.lastName}, {airman.firstName}
        </TableCell>
        <TableCell>{airman.alerts}</TableCell>
        <TableCell>{airman.notStarted}</TableCell>
        <TableCell>{airman.inProgress}</TableCell>
        <TableCell>{airman.pendingVerification}</TableCell>
        <TableCell>{airman.completed}%</TableCell>
        <TableCell>{airman.startDate}</TableCell>
        <TableCell align="center">
          {/* <Link
            to={`${airman.id}-${airman.rank}-${airman.lastName}-${airman.firstName}`}
          > */}
          <Button
            size="small"
            color="secondary"
            className={classes.viewButton}
            onClick={() => handleViewAirman(airman)}
          >
            View
          </Button>
          {/* </Link> */}
        </TableCell>
      </TableRow>
    ))}
  </MuiTableBody>
);
export default TableBody;

TableBody.propTypes = {
  tableData: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  handleViewAirman: PropTypes.func.isRequired,
};
