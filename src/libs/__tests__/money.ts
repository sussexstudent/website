import { formatPrice } from '../money';

it('renders values', () => {
  expect(formatPrice(1.0)).toEqual('1');
  expect(formatPrice(1.1)).toEqual('1.10');
  expect(formatPrice(1.33)).toEqual('1.33');
});
