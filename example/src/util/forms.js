export const getErrorList = (errors = {}) =>
  Object.keys(errors).reduce(
    (list, key) => list.concat(errors[key]), []
  );
