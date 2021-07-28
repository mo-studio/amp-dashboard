import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, Divider, Button } from '@material-ui/core';
import Controls from '../../../../components/controls/Controls';
import { useForm, Form } from '../../../../components/hooks/useForm';
import * as taskService from '../../../../services/taskService';

const initialValues = {
  id: 0,
  type: '',
  categoryID: '',
  title: '',
  text: '',
  location: '',
  office: '',
  pocName: '',
  pocEmail: '',
  pocPhoneNumber: '',
  isFirstDutyStation: false,
  isFirstTermAirman: false,
  isOfficer: false,
  verificationRequired: false,
};

const TaskForm = ({ closeTaskForm, actions, state }) => {
  const validate = (fieldValues = values) => {
    const temp = { ...errors };
    if ('type' in fieldValues)
      temp.type = fieldValues.type !== '' ? '' : 'This field is required.';
    if ('title' in fieldValues)
      temp.title =
        fieldValues.title.length > 2 ? '' : 'This field is required.';
    if ('text' in fieldValues)
      temp.text = fieldValues.text.length > 2 ? '' : 'This field is required.';
    if ('location' in fieldValues)
      temp.location =
        fieldValues.location !== '' ? '' : 'This field is required.';
    if ('office' in fieldValues)
      temp.office = fieldValues.office !== '' ? '' : 'This field is required.';
    if ('pocName' in fieldValues)
      temp.pocName =
        fieldValues.pocName.length > 2 ? '' : 'This field is required.';
    if ('pocEmail' in fieldValues)
      temp.pocEmail =
        fieldValues.pocEmail.length > 2 ? '' : 'This field is required.';
    if ('pocPhoneNumber' in fieldValues)
      temp.pocPhoneNumber =
        fieldValues.pocPhoneNumber.length >= 7 ? '' : 'This field is required.';
    setErrors({
      ...temp,
    });
    if (fieldValues === values)
      return Object.values(temp).every((x) => x === '');
  };

  const {
    values,
    errors,
    setErrors,
    handleInputChange,
    handleSwitchChange,
    resetForm,
  } = useForm(
    state.editMode ? state.selectedTask : initialValues,
    true,
    validate
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      actions.setStatusPending();
      actions.toggleTaskModal();
      if (state.editMode) {
        taskService.updateTask(values).then((data) => {
          if (data.status === 200) {
            closeTaskForm();
            resetForm();
            actions.triggerRender();
            actions.setSelectedTask(data.data);
            actions.setStatusIdle();
          }
        });
      } else {
        taskService.createTask(values).then((data) => {
          if (data.status === 200) {
            closeTaskForm();
            resetForm();
            actions.triggerRender();
            actions.setSelectedTask(data.data);
            actions.setStatusIdle();
          }
        });
      }
    }
  };

  const displayCategoriesInput = () => values.type !== '' && values.type !== 1;

  const mapCategoryToUnit = () => {
    if (state.editMode) {
      if (values.categoryID !== 1) {
        state.categories.map((item) =>
          item.id === values.categoryID ? (values.type = item.ownerID) : null
        );
      } else {
        values.type = 1;
      }
    }
  };

  mapCategoryToUnit();
  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h3">Add a Task</Typography>
          <Divider />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Controls.Select
            label="Task Type"
            value={values.type}
            name="type"
            onChange={handleInputChange}
            options={taskService.formatUnitDropdownOptions(state.units)}
            error={errors.type}
            color="secondary"
            defaultNone
            disabled={state.editMode}
          />
        </Grid>
        {displayCategoriesInput() && (
          <Grid item xs={12} sm={8} md={8}>
            <Controls.Select
              label="Category"
              value={values.categoryID}
              name="categoryID"
              onChange={handleInputChange}
              options={taskService.formatCategoriesDropdown(
                values.type,
                state.categories
              )}
              error={errors.categoryID}
              color="secondary"
              disabled={state.editMode}
            />
          </Grid>
        )}
        <Grid item xs={12} sm={9} md={9}>
          <Controls.Input
            label="Task Title"
            value={values.title}
            name="title"
            onChange={handleInputChange}
            error={errors.title}
            color="secondary"
          />
        </Grid>
        <Grid item xs={12} sm={10} md={10}>
          <Controls.Input
            label="Description"
            value={values.text}
            name="text"
            onChange={handleInputChange}
            multiline
            rows={5}
            error={errors.text}
            color="secondary"
          />
        </Grid>
        <Grid item xs={12} sm={9} md={9}>
          <Controls.Input
            label="Location"
            value={values.location}
            name="location"
            onChange={handleInputChange}
            error={errors.location}
            color="secondary"
          />
        </Grid>
        <Grid item xs={12} sm={9} md={9}>
          <Controls.Input
            label="Office"
            value={values.office}
            name="office"
            onChange={handleInputChange}
            error={errors.office}
            color="secondary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Controls.Input
            label="POC Name"
            value={values.pocName}
            name="pocName"
            onChange={handleInputChange}
            error={errors.pocName}
            color="secondary"
          />
        </Grid>
        <Grid item xs={12} sm={8} md={8}>
          <Controls.Input
            label="POC Email"
            value={values.pocEmail}
            name="pocEmail"
            onChange={handleInputChange}
            error={errors.pocEmail}
            color="secondary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Controls.Input
            label="POC Phone Number"
            value={values.pocPhoneNumber}
            name="pocPhoneNumber"
            onChange={handleInputChange}
            error={errors.pocPhoneNumber}
            color="secondary"
          />
        </Grid>
        <Grid container justify="center" alignItems="center">
          <Grid item xs={6}>
            <Typography variant="body1">First Duty Station</Typography>
          </Grid>
          <Grid item xs={6}>
            <Controls.Switch
              value={values.isFirstDutyStation}
              onChange={handleSwitchChange}
              name="isFirstDutyStation"
              label="First Duty Station"
              size="small"
              color="secondary"
            />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">First Term Airman Only</Typography>
          </Grid>
          <Grid item xs={6}>
            <Controls.Switch
              value={values.isFirstTermAirman}
              onChange={handleSwitchChange}
              name="isFirstTermAirman"
              label="First Term Airman Only"
              size="small"
              color="secondary"
            />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">Officer Only</Typography>
          </Grid>
          <Grid item xs={6}>
            <Controls.Switch
              value={values.isOfficer}
              onChange={handleSwitchChange}
              name="isOfficer"
              label="Officer Only"
              size="small"
              color="secondary"
            />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">Verification Required</Typography>
          </Grid>
          <Grid item xs={6}>
            <Controls.Switch
              value={values.verificationRequired}
              onChange={handleSwitchChange}
              name="verificationRequired"
              label="Verification Required"
              size="small"
              color="secondary"
            />
          </Grid>
        </Grid>
        <Grid
          container
          className="form-button-container"
          justify="space-around"
          alignItems="center"
        >
          <Grid item>
            <Button onClick={closeTaskForm}>Cancel</Button>
          </Grid>
          <Grid item>
            <Button
              disabled={state.status === 'pending'}
              variant="contained"
              type="submit"
            >
              {state.status === 'pending' ? 'Submitting' : 'Save'}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Form>
  );
};

export default TaskForm;

TaskForm.propTypes = {
  closeTaskForm: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};
