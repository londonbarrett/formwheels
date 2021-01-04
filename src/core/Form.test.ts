import Form from './Form';
import Field from './Field';
import { isNumber, isNotEmpty, lowerThan } from '../util/validators';
import Subscriber from './Subscriber';
import { IHash } from './Form';

const form = new Form();

const fieldSetErrors = jest.fn();
const fieldSetTouched = jest.fn();
const fieldSetValue = jest.fn();

const setters = {
  setErrors: fieldSetErrors,
  setTouched: fieldSetTouched,
  setValue: fieldSetValue
};

const field = new Field(
  {
    name: 'field',
    validators: [
      isNotEmpty('Value should not be empty')
    ],
    value: 'initial value'
  },
  form
);

const subscriberSetErrors = jest.fn();
const subscriberSetHasErrors = jest.fn();
const subscriberSetIsDirt = jest.fn();
const subscriberSetValues = jest.fn();

const subscriber = new Subscriber(
  subscriberSetErrors,
  subscriberSetHasErrors,
  subscriberSetIsDirt,
  subscriberSetValues
);

const resetMocks = () => {
  fieldSetErrors.mockReset();
  fieldSetTouched.mockReset();
  fieldSetValue.mockReset();
  subscriberSetErrors.mockReset();
  subscriberSetHasErrors.mockReset();
  subscriberSetIsDirt.mockReset();
  subscriberSetValues.mockReset();
}

const checkExpect = (params: {
  errors: Readonly<IHash<string[]>>,
  fieldsTimes: number,
  hasErrors: boolean,
  isDirt: boolean,
  subscribersTimes: number,
  values: Readonly<IHash<any>>
}) => {
  expect(fieldSetErrors).toHaveBeenCalledTimes(params.fieldsTimes);
  params.fieldsTimes && expect(fieldSetErrors).toHaveBeenLastCalledWith(params.errors.field);
  expect(fieldSetTouched).toHaveBeenCalledTimes(params.fieldsTimes);
  params.fieldsTimes && expect(fieldSetTouched).toHaveBeenLastCalledWith(params.isDirt);
  expect(fieldSetValue).toHaveBeenCalledTimes(params.fieldsTimes);
  params.fieldsTimes && expect(fieldSetValue).toHaveBeenLastCalledWith(params.values.field);
  expect(subscriberSetErrors).toHaveBeenCalledTimes(params.subscribersTimes);
  expect(subscriberSetErrors).toHaveBeenLastCalledWith(params.errors);
  expect(subscriberSetHasErrors).toHaveBeenCalledTimes(params.subscribersTimes);
  expect(subscriberSetHasErrors).toHaveBeenLastCalledWith(params.hasErrors);
  expect(subscriberSetIsDirt).toHaveBeenCalledTimes(params.subscribersTimes);
  expect(subscriberSetIsDirt).toHaveBeenLastCalledWith(params.isDirt);
  expect(subscriberSetValues).toHaveBeenCalledTimes(params.subscribersTimes);
  expect(subscriberSetValues).toHaveBeenLastCalledWith(params.values);
  expect(form.errors).toEqual(params.errors);
  expect(form.hasErrors).toEqual(params.hasErrors);
  expect(form.touched).toEqual(params.isDirt);
  expect(form.values).toEqual(params.values);
  expect(form.isFieldTouched('field')).toEqual(params.isDirt);
}

describe('Core Form', () => {

  beforeEach(() => {
    resetMocks()
  });

  it('Mounts field with initial value', () => {
    form.mountField(field, setters);
    form.subscribe(subscriber);
    checkExpect({
      errors: { field: [] },
      fieldsTimes: 0,
      hasErrors: false,
      isDirt: false,
      subscribersTimes: 1,
      values: { field: 'initial value' },
    });
  });

  it('Sets a new value and validates it', () => {
    form.setValue('field', 'new value');
    const value = form.getValue('field');
    expect(value).toEqual('new value');
    checkExpect({
      errors: { field: [] },
      fieldsTimes: 1,
      hasErrors: false,
      isDirt: true,
      subscribersTimes: 1,
      values: { field: 'new value' },
    });
  });

  it('Updates field validators', () => {
    expect(isNumber('Value should be a number')('21a')).toEqual('Value should be a number');
    expect(lowerThan(19, 'Value should be lower than 18')('another value')).toEqual('Value should be lower than 18');
    form.updateFieldValidators(
      'field',
      [
        isNumber('Value should be a number'),
        lowerThan(18, 'Value should be lower than 18'),
      ]
    );
    checkExpect({
      errors: {
        field: [
          'Value should be a number',
          'Value should be lower than 18',
        ]
      },
      fieldsTimes: 1,
      hasErrors: true,
      isDirt: true,
      subscribersTimes: 1,
      values: { field: 'new value' },
    });
    form.setValue('field', 19);
    checkExpect({
      errors: {
        field: [
          'Value should be lower than 18'
        ]
      },
      fieldsTimes: 2,
      hasErrors: true,
      isDirt: true,
      subscribersTimes: 2,
      values: { field: 19 },
    });
    form.setValue('field', 12);
    checkExpect({
      errors: { field: [] },
      fieldsTimes: 3,
      hasErrors: false,
      isDirt: true,
      subscribersTimes: 3,
      values: { field: 12 },
    });
  });

  it('Resets the form', () => {
    form.resetMounted();
    checkExpect({
      errors: { field: [] },
      fieldsTimes: 1,
      hasErrors: false,
      isDirt: false,
      subscribersTimes: 1,
      values: { field: 'initial value' },
    });
  });

  it('unmounts field', () => {
    form.unmountField(field);
    expect(form.getValue('field').setters).toBeUndefined();
  });

  xit('sets value and don\'t validate it', () => {
    form.setValue('field', '', false);
    expect(fieldSetErrors).toHaveBeenCalledTimes(0);
    // TODO: it should update the value,
    // is it necessary to don't process the value?
    expect(fieldSetValue).toHaveBeenCalledTimes(0);
    expect(fieldSetTouched).toHaveBeenCalledTimes(0);
  });

});
