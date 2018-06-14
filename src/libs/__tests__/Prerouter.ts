import { PreRouter } from '../PreRouter';

const router = new PreRouter([
  '/awesome/string',
  /^\/direct\/regex-match$/,
]);

it('matches strings endlessly', () => {
  expect(router.matches('/awesome/string/mate')).not.toBeUndefined();
  expect(router.matches('/awesome')).toBeUndefined();
});

it('matches regex directly', () => {
  expect(router.matches('/direct/regex-match')).not.toBeUndefined();
  expect(router.matches('/direct/regex-match/not')).toBeUndefined();
});

it('ignores trailing slashes', () => {
  expect(router.matches('/direct/regex-match/')).not.toBeUndefined();
  expect(router.matches('/direct/regex-match')).not.toBeUndefined();
  expect(router.matches('/awesome/string/mate')).not.toBeUndefined();
  expect(router.matches('/awesome/string/mate/')).not.toBeUndefined();
  expect(router.matches('/awesome/string/')).not.toBeUndefined();
  expect(router.matches('/awesome/string')).not.toBeUndefined();
});
