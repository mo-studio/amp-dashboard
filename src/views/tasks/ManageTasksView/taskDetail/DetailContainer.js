import React from 'react';
import PropTypes from 'prop-types';
import TaskDetail from './TaskDetail';
import ConfirmDeleteModal from '../modal/ConfirmDeleteModal';

const DetailContainer = ({ state, actions }) => (
  <>
    <TaskDetail state={state} actions={actions} />
    <ConfirmDeleteModal state={state} actions={actions} />
  </>
);

export default DetailContainer;

DetailContainer.propTypes = {
  state: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};
