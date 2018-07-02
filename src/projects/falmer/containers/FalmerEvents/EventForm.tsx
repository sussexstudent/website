import React from 'react';
import {FormikProps} from 'formik';
import {
  TextField,
  DateField,
  TimeField,
  TextAreaField,
  FieldTone
} from "~falmer/components/FormField";


export const EventForm: React.SFC<FormikProps<{}>> = (props) => (
  <form className="FalmerForm" onSubmit={props.handleSubmit}>
    <TextField name="title" label="Title" tone={FieldTone.Title} />

    <fieldset className="FormFieldSet">
      <legend>Basics</legend>


      <div className="FormFieldGroup">
        <div className="FormFieldGroup">
          <DateField name="startTime_date" label="Start Date" />
          <TimeField name="startTime_time" label="Start Time" />
        </div>

        <div className="FormFieldGroup">
          <DateField name="endTime_date" label="End Date" />
          <TimeField name="endTime_time" label="End Time" />
        </div>
      </div>


      <TextField name="kicker" label="Kicker" />
      <TextField name="locationDisplay" label="Displayed location" />

      <TextAreaField name="shortDescription" label="Short description" />
    </fieldset>

    <fieldset className="FormFieldSet">
      <legend>Social</legend>
      <TextField name="socialFacebook" label="Facebook event URL" />
    </fieldset>
  </form>
);
