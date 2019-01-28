export function getFirstItemOrValue(input: any[] | any) {

  return Array.isArray(input) ? input[0] : input;
}
