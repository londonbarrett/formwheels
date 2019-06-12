export const getErrorList = (errors: any) =>
  Object.keys(errors).reduce((list, key) => list.concat(errors[key]), []);
