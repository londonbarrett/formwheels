import { Hash } from "../core/Form";

export const isNumber = (message: string) => (value: string) =>
  !RegExp(/^-?\d+\.?\d*$/).test(value) && message;

export const isAlphabetical = (message: string) => (value: string) =>
  !RegExp(/[a-z][A-Z]/).test(value) && message;

// REVIEW: tertiary op
export const lowerThan = (limit: number, message: string) => (value: string | number) =>
  typeof value === 'number' ?
    value >= limit ? message : false :
    !RegExp(/^-?\d+\.?\d*$/).test(value) ?
      message :
      Number(value) >= limit ? message : false;

// REVIEW: tertiary op
export const greaterThan = (limit: number, message: string) => (value: string | number) =>
  typeof value === 'number' ?
    value <= limit ? message : false :
    value.match(/^-?\d+\.?\d*$/) && Number(value) >= limit ? message : false;

export const isNotEmpty = (message: string) => (value: any) =>
  (!value || value.length <= 0) && message;

export const isRequired = (message: string) => (value: any) =>
  value === undefined && message;

const checkUserNameService = (name: string) => new Promise(resolve => setTimeout(() =>
  resolve(['Bela Lugosi', 'Frank Sinatra', 'Joe Strummer'].includes(name)),
  3000
));

const checkCriminalRecordsService = (name: string) => new Promise(resolve => setTimeout(() =>
  resolve(['Frank Sinatra', 'Joe Strummer'].includes(name)),
  3000
));

export const isUserNameUnique = (message: string) =>
  async (_value: string, values: Hash<any>) => {
    const result = await checkUserNameService(`${values.firstName} ${values.lastName}`);
    return (result && message);
  };

export const hasCriminalRecords = (message: string) =>
  async (_value: string, values: Hash<any>) => {
    const result = await checkCriminalRecordsService(`${values.firstName} ${values.lastName}`);
    return (result && message);
};

export const isNameTooShort = (message: string) => (value: string) =>
  value.length <= 2 && message;
