function parseEvent(eventElement) {
  const dd = [...eventElement.querySelectorAll('dd')];
  return {
    link: eventElement.href,
    date: eventElement.querySelector('dt').innerText,
    organsiation: dd[0].innerText,
    title: dd[1].innerText,
  };
}

function parseDay(dayElement) {
  const date = parseInt(
    dayElement.querySelector('div').firstChild.nodeValue,
    10
  );
  const isCurrentMonth = dayElement.className.indexOf('othermonth') === -1;
  const isToday =
    dayElement.className.indexOf('msl_event_calendar_today') === 1;

  const eventElements = [
    ...dayElement.querySelectorAll('.msl-cal-hoverbox > a'),
  ];

  return {
    date,
    isCurrentMonth,
    isToday,
    events: eventElements.map(parseEvent),
  };
}

export default function getEventDataFromDocument(doc) {
  const days = [
    ...doc.querySelectorAll(
      '.msl_event_calendar td.othermonth, .msl_event_calendar td.month'
    ),
  ];

  return days.map(parseDay);
}
