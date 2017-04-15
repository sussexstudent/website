function eventCardLinking() {
  [...document.querySelectorAll('.EventsList .event_item')].forEach((eventItem) => {
    const link = eventItem.querySelector('.msl_event_name').href;
    const anchor = document.createElement('a');
    anchor.href = link;
    anchor.classList.add('EventsList__item');
    eventItem.parentNode.insertBefore(anchor, eventItem);
    anchor.appendChild(eventItem);
  });
}


export default function onReady() {
  eventCardLinking();
}
