export const enumValues = (e: Record<string, any>): number[] =>
  Object.values(e).filter((v) => parseInt(v, 10) >= 0);
