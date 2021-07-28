import React from 'react';
import PropTypes from 'prop-types';
import TaskForm from './TaskForm';
import TaskModal from '../modal/TaskModal';
import SlideOut from '../../../../components/SlideOut';

const FormContainer = ({ state, actions }) => {
  const closeTaskForm = () => {
    actions.toggleTaskForm();
    actions.setEditModeOff();
  };
  return state.units && state.categories ? (
    <>
      <SlideOut isOpen={state.showTaskForm}>
        <TaskForm
          actions={actions}
          state={state}
          closeTaskForm={closeTaskForm}
        />
      </SlideOut>
      <TaskModal state={state} actions={actions} />
    </>
  ) : null;
};

export default FormContainer;

FormContainer.propTypes = {
  state: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};
