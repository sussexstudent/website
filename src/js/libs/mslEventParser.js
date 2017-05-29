import getYear from 'date-fns/get_year';
import perf from '../tracking/perf';
// import getMonth from 'date-fns/get_month';

const MONTHS = {
  january: 0,
  febuary: 1,
  march: 2,
  april: 3,
  may: 4,
  june: 5,
  july: 6,
  august: 7,
  september: 8,
  october: 9,
  november: 10,
  december: 11,
};

const NOW = Date.now();

function createDate(date, timeMatch) {
  const time = timeMatch;
  if (time == null) {
    return new Date(getYear(NOW), date.month, date.day);
  }
  const timeFirst = time[2] ? parseInt(time[2], 10) : false;
  const timeSecond = time[3] ? parseInt(time[3], 10) : false;
  const timeHour = timeFirst || timeSecond;
  const timeMinuets = timeFirst === false ? 0 : timeSecond;
  if (time[0] === 'midnight') {
    time[3] = '0';
    time[4] = 'am';
  }
  const additional = time[4] === 'pm' && timeHour < 12 ? 12 : 0;
  return new Date(getYear(NOW), date.month, date.day, timeHour + additional, timeMinuets);
}

function parseDate(dateString) {
  const timeMatch = dateString.split('-').map(part => part.match(/(([0-9]+):)?([0-9]+)(am|pm)|(?:midnight)/));
  const dateMatch = /([0-9]+)(?:rd|st|nd|th) (january|febuary|march|april|may|june|july|august|september|october|november|december)/gi;
//    .map(date => date.match(/(([0-9]+)(rd|st|nd|th)) (january|febuary|march|april|may|june|july|august|september|october|november|december)/));
  let parsedDate;
  const dateData = [];
  // eslint-disable-next-line
  while ((parsedDate = dateMatch.exec(dateString)) !== null) {
    dateData.push({
      month: MONTHS[parsedDate[2].toLowerCase()],
      day: parseInt(parsedDate[0], 10),
    });
  }

  const isOverMultipleDays = dateData.length > 1;
  // const now = Date.now();
  // const isThisYear =
  const startDate = createDate(dateData[0], timeMatch[0]);
  const endDate = createDate(isOverMultipleDays ? dateData[1] : dateData[0], timeMatch[1]);

  return {
    startDate,
    endDate,
    isOverMultipleDays,
  };
}

export default function eventParser(root) {
  const time = perf.recordTime('parseEvents');
  const results = [...root.querySelectorAll('.event_item')].map((event) => {
    // return object
    const organisationId = parseInt(event.dataset.mslOrganisationId, 10);
    const brands = event.classList.value.split(' ').map((cls) => {
      const match = cls.match(/msl-brand-([a-z]+)/);
      if (!match) {
        return null;
      }

      return match[1];
    }).filter(match => match !== null);

    const anchorEl = event.querySelector('a');
    const imageEl = event.querySelector('.msl_event_image img');
    const title = event.querySelector('.msl_event_name').textContent;
    const timeString = event.querySelector('.msl_event_time').textContent;
    const location = event.querySelector('.msl_event_location').textContent;
    const description = event.querySelector('.msl_event_description').textContent;
    const date = parseDate(timeString);

    return {
      organisationId,
      brands,
      link: anchorEl.href,
      imageURL: imageEl ? imageEl.src : null,
      title,
      timeString,
      startDate: date.startDate,
      endDate: date.endDate,
      isOverMultipleDays: date.isOverMultipleDays,
      location,
      description,
    };
  });
  time.done();
  return results;
}
