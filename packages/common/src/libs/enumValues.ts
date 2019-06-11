export const enumValues = (e: Object): number[] =>
  Object.values(e).filter((v) => parseInt(v, 10) >= 0);
