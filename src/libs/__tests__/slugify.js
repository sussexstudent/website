import slugify from '../slugify';

it('removes symbols', () => {
  const result = slugify('my a*****e holiday');

  expect(result).toEqual('my-ae-holiday');
});

it('lowers case', () => {
  const result = slugify('My AWESOME holiday');

  expect(result).toEqual('my-awesome-holiday');
});

it('removes emoji', () => {
  const result = slugify(' my awesome 💪🏽 holiday ☀️');

  expect(result).toEqual('my-awesome-holiday');
});
