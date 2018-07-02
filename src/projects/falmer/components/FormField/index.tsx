import React from 'react';
import cx from 'classnames';
import {Field} from 'formik';
import {format, parse} from 'date-fns';

export enum FieldTone {
  Title = 'title',
}

interface GenericField {
  name: string;
  label: string;
  tone?: FieldTone;
}

export const TextField: React.SFC<GenericField> = ({ name, label, tone }) => (
  <Field name={name} render={({ field, form: {touched, errors}, ...props }) => (
    <div className={cx('FormField', tone ? `FormField--${tone}` : '')}>
      <label className="FormField__label" htmlFor={`form-${field.name}`}>{label}</label>
      <input className="FormField__input" type="text" id={`form-${field.name}`} {...field} {...props} />
      {touched[field.name] &&
      errors[field.name] && <div className="error">{errors[field.name]}</div>}
    </div>
  )} />
);

export const TextAreaField: React.SFC<GenericField> = ({ name, label }) => (
  <Field name={name} render={({ field, form: {touched, errors}, ...props }) => (
    <div className="FormField">
      <label className="FormField__label" htmlFor={`form-${field.name}`}>{label}</label>
      <textarea className="FormField__input" id={`form-${field.name}`} {...field} {...props} />
      {touched[field.name] &&
      errors[field.name] && <div className="error">{errors[field.name]}</div>}
    </div>
  )} />
);

export const DateField: React.SFC<GenericField> = ({ name, label }) => (
  <Field name={name} render={({ field, form: {touched, errors}, ...props }) => (
    <div className="FormField">
      <label className="FormField__label" htmlFor={`form-${field.name}`}>{label}</label>
      <input className="FormField__input" type="date" id={`form-${field.name}`} {...field} {...props} />
      {touched[field.name] &&
      errors[field.name] && <div className="error">{errors[field.name]}</div>}
    </div>
  )} />
);

export const TimeField: React.SFC<GenericField> = ({ name, label }) => (
  <Field name={name} render={({ field, form: {touched, errors}, ...props }) => (
    <div className="FormField">
      <label className="FormField__label" htmlFor={`form-${field.name}`}>{label}</label>
      <input className="FormField__input" type="time" id={`form-${field.name}`} {...field} {...props} />
      {touched[field.name] &&
      errors[field.name] && <div className="error">{errors[field.name]}</div>}
    </div>
  )} />
);

const DATE_FORMAT = 'yyyy-LL-dd';
const TIME_FORMAT = 'hh:mm';

interface DateTimeInputProps extends React.HTMLProps<HTMLInputElement> {
  onChange(e: any): void;
  value: string;
}

interface DateTimeInputState {
  date: string;
  time: string;
}

class DateTimeInput extends React.Component<DateTimeInputProps, DateTimeInputState> {
  constructor(props: DateTimeInputProps) {
    super(props);

    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleChangeTime = this.handleChangeTime.bind(this);
  }

  static getDerivedStateFromProps(props: DateTimeInputProps) {
    const date = new Date(props.value);

    return {
      date: format(date, DATE_FORMAT),
      time: format(date, TIME_FORMAT),
    }
  }

  handleChangeDate(e: React.ChangeEvent<HTMLInputElement>) {
    const date = e.currentTarget.value;
    const { time } = this.state;
    this.props.onChange(parse(`${date} ${time}`, `${DATE_FORMAT} ${TIME_FORMAT}`, new Date()).toISOString());
  }

  handleChangeTime(e: React.ChangeEvent<HTMLInputElement>) {
    const time = e.currentTarget.value;
    const { date } = this.state;
    this.props.onChange(parse(`${date} ${time}`, `${DATE_FORMAT} ${TIME_FORMAT}`, new Date()).toISOString());
  }

  render() {
    const { id, value, ...props } = this.props;
    return (
      <React.Fragment>
        <input type="date" id={id} {...props} value={this.state.date} onChange={this.handleChangeDate} onBlur={this.handleChangeDate} />
        <input type="time" id={`${id}-time`} {...props} value={this.state.time} onChange={this.handleChangeTime} onBlur={this.handleChangeTime} />
      </React.Fragment>
    );
  }
}

export const DateTimeField: React.SFC<GenericField> = ({ name, label }) => (
  <Field name={name} render={({ field, form: {touched, errors, setFieldValue}, ...props }) => (
    <div>
      <label htmlFor={`form-${field.name}`}>{label}</label>
      <DateTimeInput id={`form-${field.name}-date`} value={field.value} onChange={(value: string) => setFieldValue(name, value)} {...props} />
      {touched[field.name] &&
      errors[field.name] && <div className="error">{errors[field.name]}</div>}
    </div>
  )} />
);
