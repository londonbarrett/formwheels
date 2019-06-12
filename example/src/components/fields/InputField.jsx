import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useFieldState } from 'formwheels';
import FieldErrors from './FieldErrors';
import Input from '../controls/Input';

const Container = styled.div`
  margin: 1rem 0;
`;

const Label = styled.label`
  color: #007367;
  display: block;
  font-size: 1.3rem;
  margin: 1rem 0;
  text-align: left;
`;

const InputField = (props) => {
  const {
    errors, value, setValue, hasErrors,
  } = useFieldState(props);
  return (
    <Container>
      <Label htmlFor={props.id}>
        {props.label}
      </Label>
      <Input
        {...props}
        hasErrors={hasErrors}
        onChange={event => setValue(event.target.value)}
        value={value}
      />
      <FieldErrors errors={errors} />
    </Container>
  );
};

InputField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
};

InputField.defaultProps = {
  label: undefined,
};

export default InputField;
