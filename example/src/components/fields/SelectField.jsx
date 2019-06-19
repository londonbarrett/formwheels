import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FieldErrors from './FieldErrors';
import Select from '../controls/Select';
import { useFormState } from 'formwheels';

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

const SelectField = (props) => {
  const { errors, hasErrors, value, setValue } = useFormState(props);
  return (
    <Container>
      <Label htmlFor={props.id}>
        {props.label}
      </Label>
      <Select
        {...props}
        hasErrors={hasErrors}
        onChange={event => setValue(event.target.value)}
        value={value}
      />
      <FieldErrors errors={errors} />
    </Container>
  );
};

SelectField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
};

SelectField.defaultProps = {
  label: undefined,
};

export default SelectField;
