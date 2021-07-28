import React from 'react';
import MUIDataTable from 'mui-datatables';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Typography } from '@material-ui/core';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import data from './data';

const AirmanTable = () => {
  const columns = [
    {
      name: 'title',
      label: 'Task Title',
    },
    {
      name: 'text',
      label: 'Details',
    },
  ];

  const options = {
    filterType: 'dropdown',
    selectableRows: 'none',
    responsive: 'standard',
    expandableRows: false,
    expandableRowsOnClick: false,
    renderExpandableRow: (rowData) => (
      <TableRow>
        <TableCell colSpan={rowData.length + 1}>Insert data!</TableCell>
      </TableRow>
    ),
  };

  return (
    <PerfectScrollbar>
      <MUIDataTable
        title={
          <Typography color="textPrimary" variant="h3">
            Tasks
          </Typography>
        }
        data={data}
        columns={columns}
        options={options}
      />
    </PerfectScrollbar>
  );
};

export default AirmanTable;
