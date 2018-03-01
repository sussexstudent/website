export function formatPrice(price: number) {
  return price % 1 > 0 ? price.toFixed(2) : price;
}
