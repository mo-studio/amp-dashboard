export const initialState = {
  airmenAndProgress: [],
  months: [],
  triggerRender: false,
  showAirmenProgress: true,
  selectedAirman: {},
  selectedTask: {},
  showTaskDetail: false,
};

const types = {
  SET_AIRMEN_AND_PROGRESS: 'SET_AIRMEN_AND_PROGRESS',
  SET_MONTHS: 'SET_MONTHS',
  TRIGGER_RENDER: 'TRIGGER_RENDER',
  TOGGLE_AIRMEN_PROGRESS: 'TOGGLE_AIRMEN_PROGRESS',
  SET_SELECTED_AIRMAN: 'SET_SELECTED_AIRMAN',
  SET_SELECTED_TASK: 'SET_SELECTED_TASK',
  TOGGLE_TASK_DETAIL: 'TOGGLE_TASK_DETAIL',
};

export const mapDispatch = (dispatch) => ({
  setAirmenAndProgress: (data) =>
    dispatch({ type: types.SET_AIRMEN_AND_PROGRESS, payload: data }),
  setMonths: (data) => dispatch({ type: types.SET_MONTHS, payload: data }),
  triggerRender: () => dispatch({ type: types.TRIGGER_RENDER }),
  toggleAirmenProgress: () => dispatch({ type: types.TOGGLE_AIRMEN_PROGRESS }),
  setSelectedAirman: (data) =>
    dispatch({ type: types.SET_SELECTED_AIRMAN, payload: data }),
  toggleTaskDetail: () => dispatch({ type: types.TOGGLE_TASK_DETAIL }),
  setSelectedTask: (data) =>
    dispatch({ type: types.SET_SELECTED_TASK, payload: data }),
});

const reducer = (state, action) => {
  switch (action.type) {
    case types.SET_AIRMEN_AND_PROGRESS:
      return {
        ...state,
        airmenAndProgress: action.payload,
      };
    case types.SET_MONTHS:
      return {
        ...state,
        months: action.payload,
      };
    case types.TRIGGER_RENDER:
      return {
        ...state,
        triggerRender: !state.triggerRender,
      };
    case types.TOGGLE_AIRMEN_PROGRESS:
      return {
        ...state,
        showAirmenProgress: !state.showAirmenProgress,
      };
    case types.SET_SELECTED_AIRMAN:
      return {
        ...state,
        selectedAirman: action.payload,
      };
    case types.SET_SELECTED_TASK:
      return {
        ...state,
        selectedTask: action.payload,
      };
    case types.TOGGLE_TASK_DETAIL:
      return {
        ...state,
        showTaskDetail: !state.showTaskDetail,
      };
    default:
  }
};

export default reducer;
