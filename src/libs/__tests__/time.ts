import minimalisticTimeRenderer from '~libs/minimalisticTimeRenderer';

it('should omit minutes if on the hour', () => {
  const onHour = new Date(2019, 2, 21, 14, 0);
  expect(minimalisticTimeRenderer(onHour)).toEqual('2pm');
});

it('should display minutes if off the hour', () => {
  const offHour = new Date(2019, 2, 21, 14, 12);
  expect(minimalisticTimeRenderer(offHour)).toEqual('2:12pm');
});
