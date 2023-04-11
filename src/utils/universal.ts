export const isObject = (obj: unknown): obj is object => {
  return !!obj && typeof obj === 'object';
};
