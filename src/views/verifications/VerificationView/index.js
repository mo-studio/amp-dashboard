import React, { useState, useEffect } from 'react';
import { Container, makeStyles } from '@material-ui/core';
import Page from '../../../components/Page';
import TaskTable from './TaskTable';
import {
  fetchTasks,
  getTaskProgressByUserID,
  getUsers,
  verifyTaskProgressByUserID,
} from '../../../services/taskService';
import { useForm } from '../../../components/hooks/useForm';
import FilterForm from './FilterForm';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'theme.palette.background.dark',
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
    '& .MuiContainer-root': {
      display: 'flex',
      paddingLeft: '0',
      paddingRight: 0,
    },
    '& .MuiGrid-container': {
      paddingRight: '10px',
      paddingLeft: '10px',
    },
  },
}));

const initialValues = {
  taskLevel: '',
  officeFilter: '',
  verificationFilter: '',
};

const VerificationView = () => {
  const classes = useStyles();
  const [tasks, setTasks] = useState();
  const [units, setUnits] = useState();
  const [officeList, setOfficeList] = useState();
  const [selectedTask, setSelectedTask] = useState();
  const { values, handleInputChange, resetForm } = useForm(initialValues);

  const fetchUsersTask = async () => {
    const userList = await getUsers();
    const listOfUsers = [];
    userList.users.map((item) => listOfUsers.push(item));
    const userTaskInProgress = [];
    await Promise.all(
      listOfUsers.map(async (user) => {
        const progressItemArray = await getTaskProgressByUserID(user.id);
        progressItemArray.taskStatuses.forEach((progressItem) => {
          if (progressItem.status === 'completed') {
            // console.log('');
          } else {
            const taskProgressObj = {
              userID: user.id,
              rank: user.role,
              taskID: progressItem.taskID,
              status: progressItem.status,
              createdAt: progressItem.createdAt,
            };
            return userTaskInProgress.push(taskProgressObj);
          }
        });
      })
    );
    const userTaskArray = [];
    await Promise.all(
      listOfUsers.map(async (user) => {
        const taskItem = await fetchTasks(user.id);

        const taskObj = {
          userID: user.id,
          rank: user.role,
          userFirstName: user.firstName,
          userLastName: user.lastName,
          unitID: user.unitID,
          tasks: taskItem.categories.flat(),
        };
        return userTaskArray.push(taskObj);
      })
    );
    const allUserTasks = [];
    let key = 0;
    userTaskArray.forEach((taskObj) => {
      taskObj.tasks.forEach((taskArray) => {
        taskArray.tasks.forEach((task) => {
          const taskItem = {
            key,
            taskID: task.id,
            userID: taskObj.userID,
            rank: taskObj.rank,
            userFirstName: taskObj.userFirstName,
            userLastName: taskObj.userLastName,
            unitId: taskObj.unitID,
            taskTitle: task.title,
            verificationRequired: task.verificationRequired,
          };
          key += 1;
          allUserTasks.push(taskItem);
        });
      });
    });
    const finalArray = [];
    allUserTasks.forEach((userTask) => {
      userTaskInProgress.forEach((inProgressTask) => {
        if (
          inProgressTask.userID === userTask.userID &&
          inProgressTask.taskID === userTask.taskID
        ) {
          userTask.status = inProgressTask.status;
          userTask.createdAt = inProgressTask.createdAt;
          if (userTask.verificationRequired === true) {
            finalArray.push(userTask);
          }
        }
      });
    });
    return finalArray;
  };
  useEffect(async () => {
    const userTasksItems = await fetchUsersTask();
    setTasks(userTasksItems);
  }, []);

  const formatUnitSelectOptions = (listOfUnits) => {
    const result = listOfUnits
      .map((item) => ({ id: item.id, title: item.name }))
      .filter((item) => item.id !== 1);
    return [{ id: 1, title: 'Base Wide Tasks' }, ...result];
  };

  const handleViewTask = (task) => {
    setSelectedTask(task);
  };

  const updateTaskProgress = (userID, taskID) => {
    verifyTaskProgressByUserID(userID, taskID);
    const updatedState = [];
    tasks.forEach((task) => {
      if (task.userID === userID && task.taskID === taskID) {
        // console.log('');
      } else {
        updatedState.push(task);
      }
    });
    setTasks(updatedState);
  };

  return (
    <Page className={classes.root} title="Tasks">
      <Container maxWidth={false}>
        {officeList && units && (
          <FilterForm
            onChange={handleInputChange}
            values={values}
            officeSelectOptions={officeList}
            resetForm={resetForm}
            unitSelectOptions={formatUnitSelectOptions}
            units={units}
          />
        )}

        {tasks && (
          <TaskTable
            tasks={tasks}
            filters={values}
            handleViewTask={handleViewTask}
            updateTaskProgress={updateTaskProgress}
          />
        )}
      </Container>
    </Page>
  );
};

export default VerificationView;
