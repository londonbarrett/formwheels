export const isNumber = (message: string) => (value: any) =>
  Number.isNaN(Number(value)) ? message : false;

export const lowerThan = (limit: number, message: string) => (value: any) =>
  value > limit ? message : false;

export const greaterThan = (limit: number, message: string) => (
  value: any
) => (value < limit ? message : false);

export const isNotEmpty = (message: string) => (value: any) =>
  !value || value.length <= 0 ? message : false;

export const isRequired = (message: string) => (value: any) =>
  value === undefined ? message : false;
