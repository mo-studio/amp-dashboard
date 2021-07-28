import React, { useState, useEffect } from 'react';
import { Button, makeStyles } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import PerfectScrollbar from 'react-perfect-scrollbar';
import axios from 'axios';
import Loading from '../../../components/Loading';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  (config) => {
    const token = window.accessToken ? window.accessToken : 'dummy_token';
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use((response) => response.data);

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
const title = '';

export default function AirmanTaskList(categoryList) {
  const { actions } = categoryList;
  const classes = useStyles();
  const id = categoryList.userID;

  const [categories, setCategories] = useState('');
  const [statuses, setStatuses] = useState();
  const url = process.env.REACT_APP_API_URL;
  useEffect(() => {
    getAllCategories();
  }, []);

  const getAllCategories = async () => {
    //  get all tasks in airman's checklist
    await axios
      .get(`${url}/checklist/${id}`)
      .then((response) => {
        const allCategories = response.data;
        setCategories(allCategories);
      })
      .catch((err) => err);

    //  get task statuses
    const allStatuses = await axios
      .get(`${url}/progress/${id}`)
      .then((resp) =>
        resp.data.taskStatuses.map((result) => {
          const dict = {};
          dict.id = result.taskID;
          if (result.status === 'inProgress') {
            dict.status = 'In Progress';
          } else if (result.status === 'pendingVerification') {
            dict.status = 'Pending Verification';
          } else if (result.status === 'completed') {
            dict.status = 'Completed';
          } else {
            dict.status = 'Not Started';
          }
          return dict;
        })
      )
      .catch((err) => err);
    setStatuses([...new Set(allStatuses)]);
  };

  const displayTasks = ({ userID, handleViewTask }) => {
    if (categories && statuses) {
      const data = categories.categories.slice(0);
      const allTasks = data.map((task) => {
        const taskDetails = task.tasks.map((details) => {
          let taskStatus = '';
          let action = '';
          if (statuses.length > 0) {
            statuses.forEach((taskItem) => {
              if (taskItem.id === details.id) {
                taskStatus = taskItem.status;
              }
            });
          }
          if (taskStatus === '') {
            taskStatus = 'Not Started';
          }

          if (
            details.verificationRequired === true &&
            taskStatus !== 'Completed'
          ) {
            action = 'Verify Now';
          }

          function handleClick() {
            const updatedStatus = {
              status: 'completed',
              taskID: details.id,
            };
            axiosInstance
              .put(
                `'${process.env.REACT_APP_API_URL}'/progress/${userID}`,
                updatedStatus
              )
              .then((res) => {
                const updatedProgress = res.data;
                window.location.reload();
              });
          }

          if (action) {
            action = (
              <Button
                color="secondary"
                size="small"
                variant="contained"
                onClick={() => handleClick(details.id, userID)}
              >
                {action}
              </Button>
            );
          }

          return (
            <TableRow>
              <TableCell>{details.title}</TableCell>
              <TableCell>{details.office}</TableCell>
              <TableCell>{details.pocName}</TableCell>
              <TableCell>{taskStatus}</TableCell>
              <TableCell>{action}</TableCell>
              <TableCell>
                <Button
                  size="small"
                  color="secondary"
                  className={classes.viewButton}
                  onClick={() => handleViewTask(details)}
                >
                  View
                </Button>
              </TableCell>
            </TableRow>
          );
        });
        return <TableBody>{taskDetails}</TableBody>;
      });
      return (
        <PerfectScrollbar>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Task Title</TableCell>
                <TableCell>Office</TableCell>
                <TableCell>Point of Contact</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
                <TableCell>Task Details</TableCell>
              </TableRow>
            </TableHead>
            {allTasks}
          </Table>
        </PerfectScrollbar>
      );
    }
    return <Loading />;
  };

  return <>{displayTasks(categoryList)}</>;
}
