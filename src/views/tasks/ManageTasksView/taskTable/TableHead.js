import React from 'react';
import PropTypes from 'prop-types';
import {
  TableHead as MuiTableHead,
  TableRow,
  TableCell,
} from '@material-ui/core/';

const TableHead = ({ headers }) => {
  const lastIndex = headers.length - 1;
  return (
    <MuiTableHead>
      <TableRow>
        {headers.map((item, index) =>
          index === lastIndex ? (
            <TableCell key={index} align="center">
              {item}
            </TableCell>
          ) : (
            <TableCell key={index}>{item}</TableCell>
          )
        )}
      </TableRow>
    </MuiTableHead>
  );
};

export default TableHead;

TableHead.propTypes = {
  headers: PropTypes.array.isRequired,
};
