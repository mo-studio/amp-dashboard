import axios from 'axios';
import moment from 'moment';

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

export const getFirstDutyStationOptions = () => [
  { id: 1, title: 'First Duty Station' },
  { id: 2, title: 'PCS' },
];

export const getAlerts = () => [
  { id: 1, title: '> 30 Days' },
  { id: 2, title: '< 10% Complete' },
];

function datediff(first, second) {
  // Take the difference between the dates and divide by milliseconds per day.
  // Round to nearest whole number to deal with DST.
  return Math.round((second - first) / (1000 * 60 * 60 * 24));
}

const airmanDetails = [];
const airmanProgress = [];
const airmenProgressData = [];
export const getAirmenAndProgress = async () => {
  try {
    //  get all unit IDs in specific in base
    const unitIDs = await axiosInstance
      .get(`${process.env.REACT_APP_API_URL}/base/1/units`)
      .then((response) => response.map((result) => result.id));

    //  get all airmen in base
    const allAirmanIDs = [];
    const allAirmenInBase = [];
    // console.log('unitIDs', unitIDs);
    for (const unitID of unitIDs) {
      await axiosInstance
        .get(`${process.env.REACT_APP_API_URL}/base/1/unit/${unitID}/users`)
        .then((response) => {
          if (response.length > 0) {
            allAirmenInBase.push(response[0]);
          }
          return response.map((result) => {
            allAirmanIDs.push(result.id);
            return result.id;
          });
        });
    }
    //  get progress for each airman in base
    for (const id of allAirmanIDs) {
      const dict = {};
      let notStarted = 0;
      let inProgress = 0;
      let pendingVerification = 0;
      let completed = 0;
      const statuses = await axiosInstance
        .get(`${process.env.REACT_APP_API_URL}/progress/${id}`)
        .then((resp) => resp.taskStatuses.map((result) => result.status))
        .catch((err) => err);
      const taskTotal = await axiosInstance
        .get(`${process.env.REACT_APP_API_URL}/checklist/${id}`)
        .then((resp) => resp.categories)
        .catch((err) => err);
      const taskTotalSliced = taskTotal.slice(0);
      let totalNumTasks = 0;
      taskTotalSliced.map((task) =>
        task.tasks.map((numTasks) => (totalNumTasks += 1))
      );

      //  get progress values
      statuses.forEach((n) => {
        if (n === 'inProgress') {
          inProgress += 1;
        } else if (n === 'pendingVerification') {
          pendingVerification += 1;
        } else if (n === 'completed') {
          completed += 1;
        }
      });
      notStarted = totalNumTasks - statuses.length;
      completed = Math.round((completed / totalNumTasks) * 100);
      dict.id = id;
      if (notStarted === 0) {
        notStarted = '-';
      }
      if (inProgress === 0) {
        inProgress = '-';
      }
      if (pendingVerification === 0) {
        pendingVerification = '-';
      }
      dict.notStarted = notStarted;
      dict.inProgress = inProgress;
      dict.pendingVerification = pendingVerification;
      dict.completed = completed;

      if (completed < 10) {
        dict.alerts = '< 10% Complete';
      }
      const today = new Date();

      allAirmenInBase.forEach((airman) => {
        if (airman.id === id) {
          const difference = datediff(
            Date.parse(airman.createdAt),
            Date.parse(today)
          );
          if (difference > 30) {
            dict.alerts = '> 30 Days';
          }
          if (airman.role === 'airman') {
            airman.rank = 'Amn';
          }
          dict.startDate = moment(new Date(airman.createdAt)).format(
            'DD MMM YYYY'
          );
          dict.monthStarted = moment(Date(airman.createdAt)).format(
            'MMMM YYYY'
          );
          const airmanData = { ...airman, ...dict };
          if (airmenProgressData.length < allAirmanIDs.length) {
            airmenProgressData.push(airmanData);
          }
        }
      });
      if (airmanProgress.length < allAirmanIDs.length) {
        airmanProgress.push(dict);
      }
    }

    let monthsArray = [];
    airmenProgressData.map((item) => monthsArray.push(item.monthStarted));
    monthsArray = [...new Set(monthsArray)];
    const allMonths = monthsArray.map((o) => ({ id: o, title: o }));

    airmanDetails.push(airmenProgressData);
    airmanDetails.push(allMonths);
    return airmanDetails;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

export const getMonths = async (data) => {
  try {
    let monthsArray = [];
    data.map((item) => monthsArray.push(item.monthStarted));
    monthsArray = [...new Set(monthsArray)];
    const allMonths = monthsArray.map((o) => ({ id: o, title: o }));
    return allMonths;
  } catch (error) {
    console.warn(`Error: ${error}`);
  }
};
