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
  const [step, setStep] = useState('user');
  const backClickHandler = () => setStep('user');
  const nextClickHandler = (form) => !form.hasErrors && setStep('comment');
  const submitHandler = (form) => console.log('SUBMIT', form);
  const resetHandler = () => {};
  return (
    <StyledForm
      name="comment"
      onSubmit={submitHandler}
      onReset={resetHandler}
    >
      {step === 'user' && (
        <User
          age={age}
          firstName={firstName}
          lastName={lastName}
          region={region}
        />
      )}
      {step === 'comment' && (
        <Comment accept={accept} rating={rating} />
      )}
      <FormErrors />
      <Actions>
        <Reset />
        {step === 'user' && <Submit onClick={nextClickHandler} value="Next" />}
        {step === 'comment' && <Button onClick={backClickHandler}>Back</Button>}
        {step === 'comment' && <Submit value="Send" />}
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
