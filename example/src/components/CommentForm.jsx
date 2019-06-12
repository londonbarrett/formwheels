import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Form, validators } from 'formwheels';
import InputField from './fields/InputField';
import CheckboxField from './fields/CheckboxField';
import RatingField from './fields/RatingField';
import SelectField from './fields/SelectField';
import Reset from './Reset';
import Submit from './Submit';
import FormErrors from './FormErrors';

const StyledForm = styled(Form)`
  margin: 4rem auto;
  width: 400px;
`;

const Label = styled.label`
  color: #007367;
  display: block;
  font-size: 1.3rem;
  margin: 1rem 0;
  text-align: left;
`;

const Actions = styled.div`
  margin: 1rem 0;
  margin-top: 2rem;
  text-align: right;
`;

const CommentForm = ({
  firstName,
  lastName,
  age,
  accept,
  rating,
  region,
  onSubmit,
}) => {
  const regionChangeHandler = (event) => {
    // event.context.setValue('age', event.value);
  };

  const ageChangeHandler = ({ context, value }) => {
    const fn = context.getValue('firstName');
    context.setValue('lastName', `${fn} ${value}`, []);
    context.setValue('region', value);
  };

  const submitHandler = () => {};

  const resetHandler = () => {};

  return (
    <StyledForm
      name="comment"
      onSubmit={submitHandler}
      onReset={resetHandler}
    >
      <InputField
        id="firstName"
        label="First Name"
        name="firstName"
        validators={[
          validators.isNotEmpty('First Name should not be empty'),
        ]}
        value={firstName}
      />
      <InputField
        id="lastName"
        label="Last Name"
        name="lastName"
        value={lastName}
      />
      <InputField
        id="age"
        label="Age"
        name="age"
        onChange={ageChangeHandler}
        validators={[
          validators.isNotEmpty('Age should not be empty'),
          validators.isNumber('Age should be a number'),
          validators.lowerThan(150)('Age should be under 150'),
        ]}
        value={age}
      />
      <div>
        <Label>
          Terms & Conditions
        </Label>
        <CheckboxField
          id="accept"
          label="Do you accept terms and contidions"
          name="accept"
          validators={[
            validators.isRequired('Terms & Conditions must be accepted'),
          ]}
          value={accept}
        />
      </div>
      <SelectField
        id="region"
        label="Region"
        name="region"
        options={[
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
      <RatingField
        label="Rating"
        id="rating"
        name="rating"
        validators={[
          validators.isRequired('Rating field is required'),
        ]}
        value={rating}
      />
      <FormErrors />
      <Actions>
        <Reset />
        <Submit value="Send" />
      </Actions>
    </StyledForm>
  );
};

CommentForm.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  age: PropTypes.string,
  accept: PropTypes.bool,
  rating: PropTypes.number,
  region: PropTypes.string,
  onSubmit: PropTypes.func,
};

CommentForm.defaultProps = {
  firstName: undefined,
  lastName: undefined,
  age: undefined,
  accept: undefined,
  rating: undefined,
  region: undefined,
  onSubmit: undefined,
};

export default CommentForm;
