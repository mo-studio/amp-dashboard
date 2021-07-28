import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AirmanTaskList from './AirmanTaskList';

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

export default function AirmanTasks({ id, handleViewTask }) {
  const [categories, getCategories] = useState('');
  const [statuses, getStatuses] = useState('');
  const url = '${process.env.REACT_APP_API_URL}';
  useEffect(() => {
    getAllCategories();
  }, []);

  const getAllCategories = async () => {
    await axiosInstance
      .get(`${url}/checklist/${id}`)
      .then((response) => {
        const allCategories = response.data;
        getCategories(allCategories);
      })
      .catch((err) => err);

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
    getStatuses(allStatuses);
    // console.log('statuses', statuses);
  };
  return (
    <AirmanTaskList
      categories={categories}
      statuses={statuses}
      userID={id}
      handleViewTask={handleViewTask}
    />
  );
}
