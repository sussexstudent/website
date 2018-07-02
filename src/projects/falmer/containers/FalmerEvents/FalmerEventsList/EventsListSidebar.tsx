import React from 'react';
import { Formik, FormikProps } from 'formik';
import FalmerSidebar from '~falmer/components/FalmerSidebar';
import { Link } from 'react-router-dom';
import { format, parse } from 'date-fns';
interface FormInputBaseProps {
  name: string;
  label: string;
}

interface FormInputProps {
  type: string;
  placeholder?: string;
  form: FormikProps<any>;
}

const FormInputBase: React.SFC<FormInputBaseProps> = ({ name, label, children }) => (
  <div className="FalmerSidebar__field">
    <label className="FalmerSidebar__field-label" htmlFor={name}>
      {label}
    </label>
    {children}
  </div>
);

const FormInput: React.SFC<FormInputProps & FormInputBaseProps> = (props) => (
  <FormInputBase name={props.name} label={props.label}>
    <input
      className="FalmerSidebar__field-input"
      type={props.type}
      name={props.name}
      onChange={props.form.handleChange}
      onBlur={props.form.handleBlur}
      value={props.form.values[name]}
      placeholder={props.placeholder}
    />
  </FormInputBase>
);
//
// const DateFromDateTimeInput: React.SFC<React.HTMLProps<HTMLInputElement>> = (props) => (
//   <input type="date" value={props.value ? format(new Date(props.value as string), 'YYYY-MM-DD') : ''} onChange= />
// )

export interface EventFilterForm {
  title: string;
  fromTime?: string;
  toTime?: string;
}
export interface EventFilter {
  title: string;
  fromTime?: Date;
  toTime?: Date;
}

interface EventsListSidebarProps {
  onFilterChange(data: EventFilter): void;
  initialFilters: EventFilter;
}

const FORMATTING_STRING = 'yyyy-LL-dd';

const convertToForm = (values: EventFilter): EventFilterForm => ({
  ...values,
  toTime: values.toTime && format(values.toTime, FORMATTING_STRING),
  fromTime: values.fromTime && format(values.fromTime, FORMATTING_STRING),
});

export const EventsListSidebar: React.SFC<EventsListSidebarProps> = (props) => (
  <FalmerSidebar>
    <Link className="Button" to="/events/new">
      New Event
    </Link>

    <Formik
      onSubmit={(values) => {
        const x = {
          ...values,
          fromTime:
            values.fromTime ? parse(values.fromTime, FORMATTING_STRING, new Date()) : undefined,
          toTime:
            values.toTime ? parse(values.toTime, FORMATTING_STRING, new Date()) : undefined,
        };
        console.log({ values, x });
        props.onFilterChange(x)
      }
      }
      initialValues={convertToForm(props.initialFilters)}
      render={(form) => (
        <form onSubmit={form.handleSubmit}>
          <FormInput
            type="search"
            name="title"
            label="Search"
            placeholder="titles, descriptions"
            form={form}
          />
          <FormInput
            type="text"
            name="society"
            label="Limit society"
            placeholder="titles, descriptions"
            form={form}
          />
          <FormInput
            type="date"
            name="fromTime"
            label="From date"
            placeholder=""
            form={form}
          />
          <FormInput
            type="date"
            name="toTime"
            label="To date"
            placeholder=""
            form={form}
          />
          {/*<FormInputBase name="toTime" label="Filter to">*/}
          {/*<DateFromDateTimeInput name="toTime" />*/}
          {/*</FormInputBase>*/}
          <FormInput
            type="text"
            name="venue"
            label="Venue"
            placeholder=""
            form={form}
          />
          <input type="submit" />
        </form>
      )}
    />
  </FalmerSidebar>
);
