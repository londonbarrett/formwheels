import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FieldErrors from './FieldErrors';
import Rating from '../controls/Rating';
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

function RatingField(props) {
  const { errors, value, setValue } = useFormState(props);
  return (
    <Container>
      <Label htmlFor={props.id}>
        {props.label}
      </Label>
      <Rating
        {...props}
        onChange={val => setValue(val)}
        value={value}
      />
      <FieldErrors errors={errors} />
    </Container>
  );
}

RatingField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
};

RatingField.defaultProps = {
  label: undefined,
};

export default RatingField;
