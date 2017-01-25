export default () => {
  [...document.querySelectorAll('.EventsList .event_item')].forEach((eventItem) => {
    const link = eventItem.querySelector('.msl_event_name').href;
    const anchor = document.createElement('a');
    anchor.href = link;
    anchor.classList.add('EventsList__item');
    // eslint-disable-next-line
    eventItem.parentNode.insertBefore(anchor, eventItem);
    anchor.appendChild(eventItem);
  });
};
