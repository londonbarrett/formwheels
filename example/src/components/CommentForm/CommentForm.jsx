import { Form } from 'formwheels';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styled from 'styled-components';
import Comment from './Comment';
import User from './User';
import FormErrors from '../FormErrors';
import Reset from '../Reset';
import Submit from '../Submit';
import Button from '../controls/Button/Button';

const StyledForm = styled(Form)`
  margin: 4rem auto;
  width: 400px;
`;

const Actions = styled.div`
  margin: 1rem 0;
  margin-top: 2rem;
  text-align: right;
  & button, & input {
    margin-left: 1rem;
  }
`;

const CommentForm = ({
  accept,
  age,
  firstName,
  lastName,
  rating,
  region,
  onSubmit,
}) => {
  const [step, setStep] = useState(0);
  const backClickHandler = () => setStep(0);
  const nextClickHandler = () => setStep(1);
  const submitHandler = (values) => console.log('SUBMIT', values);
  const resetHandler = () => {};
  return (
    <StyledForm
      name="comment"
      onSubmit={submitHandler}
      onReset={resetHandler}
    >
      {step === 0 && (
        <User
          age={age}
          firstName={firstName}
          lastName={lastName}
          region={region}
        />
      )}
      {step === 1 && (
        <Comment accept={accept} rating={rating} />
      )}
      <FormErrors />
      <Actions>
        <Reset />
        {step === 1 && <Button onClick={backClickHandler}>Back</Button>}
        {step === 1 && <Submit value="Send" />}
        {step === 0 && <Button onClick={nextClickHandler}>Next</Button>}
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
  accept: false,
  rating: 0,
  region: undefined,
  onSubmit: undefined,
};

export default CommentForm;
