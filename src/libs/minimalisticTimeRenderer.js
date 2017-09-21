import getMinutes from 'date-fns/get_minutes';
import formatDate from 'date-fns/format';

export default function minimalisticTimeRenderer(date) {
  if (getMinutes(date) === 0) {
    return formatDate(date, 'ha');
  }
  return formatDate(date, 'h:ssa');
}
