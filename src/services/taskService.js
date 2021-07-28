import axios from 'axios';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  config => {
    const token = window.accessToken ? window.accessToken : 'dummy_token';
    config.headers.Authorization = `Bearer ${token}`
    return config
  },
  error => {
    Promise.reject(error)
  })

axiosInstance.interceptors.response.use((response) => {
  return response.data;
});

const URL = process.env.REACT_APP_API_URL

export const filterOutUndefined = (array) =>
  array.filter((x) => typeof x.categories !== 'undefined');

export const createAllCategoriesArray = (array) => {
  const results = [];
  array.map((x) => results.push(...x.categories));
  return results;
};

export const createAllTasksArray = (array) => {
  const results = [];
  array.map((item) => item.categories.map((x) => results.push(...x.tasks)));
  return results;
};

export const removeDuplicateOffices = (array) => {
  let results = [];
  array.map((item) => results.push(item.office));
  results = [...new Set(results)];
  return results;
};

export const formatForSelectDropdown = (array) =>
  array
    .map((item) => ({ id: item, title: item }))
    .sort((a, b) => (a.id < b.id ? -1 : 1));

export const formatUnitDropdownOptions = (array) => {
  const result = array
    .map((item) => ({ id: item.id, title: item.name }))
    .filter((item) => item.id !== 1);
  return [{ id: 1, title: 'Base Wide Task' }, ...result];
};

export const onlyShowRelevantOffices = (tableData, officeList) => {
  const tempArray = tableData.map((item) => item.office);
  return officeList.filter((x) => tempArray.includes(x.id));
};

export const formatCategoriesDropdown = (id, array) =>
  array
    .map((item) => item.ownerID === id && { id: item.id, title: item.title })
    .filter((x) => x !== false);

export const getVerificationFilterOptions = () => [
  { id: 'Yes', title: 'Yes' },
  { id: 'No', title: 'No' },
];

export const fetchTasks = async (userID) => {
  try {
    const response = await axiosInstance.get(`${URL}/checklist/${userID}`);
    return response;
  } catch (error) {
    console.warn(`Error: ${error}`);
  }
};

export const getTaskOffices = async () => {
  try {
    const response = axiosInstance.get(`${URL}/checklist/2`);
    const taskOffices = [];
    let count = 0;
    await response.then((result) => {
      result.data.categories.map((cat) =>
        cat.tasks.map((item) => {
          count += 1;
          return taskOffices.push({ id: count, title: item.office });
        })
      );
    });
    return taskOffices.sort((a, b) => (a.title > b.title ? 1 : -1));
  } catch (error) {
    console.warn(`Error: ${error}`);
  }
};

export const getCategoriesByUnit = async (unitID) => {
// try {
//   await fetch(`${URL}categories/${unitID}`).then(res => {
//     return res.json()
//   }).then(function (data) {
//     return data
//   });
// } catch (error) {
//   console.log(`Error: ${error}`);
// }

  try {
    const response = await axiosInstance.get(`${URL}/categories/${unitID}`);
    return response
  } catch (error) {
    console.warn(`Error: ${error}`);
  }

};

export const formatTasksByCategories = async (unitList) => {
  const categories = [];
  await unitList.map((item) => categories.push(getCategoriesByUnit(item.id)));
  const results = Promise.all(categories);
  return results;
};

export const getUnitsByBaseID = async () => {
  //  const baseID = 1;
  //  try {

  //    const response = await fetch(`${URL}base/${baseID}/units`, {
  //      credentials: 'include',
  //      mode: 'cors'
  //    }).then(res => {
  //   return res.json()
  // }).then(function (data) {
  //   console.log(data)
  //   return data 
  // });

  //   const categories = (await formatTasksByCategories(response).then((res) => (res)));
  //   return { units: response, categories };
  // } catch (error) {
  //    console.log(`Error: ${error}`);
  // }

  const baseID = 1;
  try {
    const response = await axiosInstance.get(`${URL}/base/${baseID}/units`);
    console.log(response)
    const categories = (await formatTasksByCategories(response).then((res) => (res)));
    return { units: response, categories };
    
  } catch (error) {
    console.warn(`Error: ${error}`);
  }
};

export const getUsers = async () => {
  try {
    const response = await axiosInstance.get(`${URL}/users`);
    // console.log(response.data);
    return response;
  } catch (error) {
    console.warn(`Error: ${error}`);
  }
};

export const getTaskProgressByUserID = async (userID) => {
  try {
    const response = await axiosInstance.get(`${URL}/progress/${userID}`);
    // console.log(response.data);
    return response;
  } catch (error) {
    console.warn(`Error: ${error}`);
  }
};

export const verifyTaskProgressByUserID = async (userID, taskID) => {
  try {
    const response = await axiosInstance.put(`${URL}/progress/${userID}`,{taskID,status:"completed"});
    // console.log(response.data);
    return response;
  } catch (error) {
    console.warn(`Error: ${error}`);
  }
};

export const updateTask = async (values) => {
  try {
    const response = await axiosInstance.put(
      `${URL}/category/${values.categoryID}/task/${values.id}`,
      {
        title: values.title,
        text: values.text,
        categoryID: values.categoryID,
        isFirstDutyStation: values.isFirstDutyStation,
        isFirstTermAirman: values.isFirstTermAirman,
        isOfficer: values.isOfficer,
        verificationRequired: values.verificationRequired,
        location: values.location,
        office: values.office,
        pocName: values.pocName,
        pocPhoneNumber: values.pocPhoneNumber,
        pocEmail: values.pocEmail,
      }
    );

    return response;
  } catch (error) {
    console.warn(`Error: ${error}`);
  }
};

export const createTask = async (values) => {
  const categoryID = values.categoryID || 1;
  try {
    const response = await axiosInstance.post(`${URL}/category/${categoryID}/task`, {
      title: values.title,
      text: values.text,
      categoryID,
      isFirstDutyStation: values.isFirstDutyStation,
      isFirstTermAirman: values.isFirstTermAirman,
      isOfficer: values.isOfficer,
      verificationRequired: values.verificationRequired,
      location: values.location,
      office: values.office,
      pocName: values.pocName,
      pocPhoneNumber: values.pocPhoneNumber,
      pocEmail: values.pocEmail,
    });
    return response;
  } catch (error) {
    console.warn(`Error: ${error}`);
  }
};

export const findIndexOfTaskCategory = (categoryID, array) =>
  array.findIndex((item) => item.id === categoryID);

export const deleteTask = async (task) => {
  try {
    const response = await axiosInstance.delete(
      `${URL}category/${task.categoryID}/task/${task.id}`
    );

    return response;
  } catch (error) {
    console.warn(`Error: ${error}`);
  }
};
