export function formatPrice(price: number): string {
  return price % 1 > 0 ? price.toFixed(2).toString() : price.toString();
}
