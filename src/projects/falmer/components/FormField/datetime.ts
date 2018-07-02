import {parse, isValid} from "date-fns";

const DATE_FORMAT = 'yyyy-LL-dd';
const TIME_FORMAT = 'hh:mm';

export const inputToDate = (date: string, time: string) => {
  const created = parse(`${date} ${time}`, `${DATE_FORMAT} ${TIME_FORMAT}`, new Date());

  return isValid(created) ? created : null;
};
