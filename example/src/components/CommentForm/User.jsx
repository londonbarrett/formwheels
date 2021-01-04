import { validators } from 'formwheels';
import PropTypes from 'prop-types';
import React from 'react';
import CheckboxField from '../fields/CheckboxField';
import InputField from '../fields/InputField';
import SelectField from '../fields/SelectField';

const User = ({
  age, firstName, lastName, region,
}) => {
  const validateLastNameChangeHandler = event => {
    const vals = event.value && [validators.isNotEmpty('Last Name should not be empty')];
    event.context.updateFieldValidators('lastName', vals);
  };
  const regionChangeHandler = (event) => {
    // event.context.setValue('age', event.value);
  };

  const ageChangeHandler = ({ context, value }) => {
    // const fn = context.getValue('firstName');
    // context.setValue('lastName', `${fn} ${value}`, []);
    // context.setValue('region', value);
  };
  return (
    <div>
      <InputField
        id="firstName"
        label="First Name"
        name="firstName"
        value={firstName}
      />
      <InputField
        id="lastName"
        label="Last Name"
        name="lastName"
        validators={[
          validators.isNameTooShort('Name is too short'),
          validators.isUserNameUnique('User name is taken'),
          validators.hasCriminalRecords('You have criminal records'),
        ]}
        value={lastName}
      />
      <CheckboxField
        id="validateNames"
        label="Validate Names"
        name="validateNames"
        onChange={validateLastNameChangeHandler}
      />
      <InputField
        id="age"
        label="Age"
        name="age"
        onChange={ageChangeHandler}
        type="number"
        validators={[
          validators.isNotEmpty('Age should not be empty'),
          validators.isNumber('Age should be a number'),
          validators.lowerThan(150, 'Age should be under 150'),
        ]}
        value={age}
      />
      <SelectField
        id="region"
        label="Region"
        name="region"
        options={[
          {
            label: 'Select a value',
            value: '',
          },
          {
            label: 'Africa',
            value: '5',
          },
          {
            label: 'America',
            value: '2',
          },
          {
            label: 'Europe',
            value: '356',
          },
        ]}
        onChange={regionChangeHandler}
        value={region}
      />
    </div>
  );
}

User.propTypes = {
  age: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  region: PropTypes.string,
};

User.defaultProps = {
  age: undefined,
  firstName: undefined,
  lastName: undefined,
  region: undefined,
};

export default User;
