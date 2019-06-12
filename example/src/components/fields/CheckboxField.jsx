import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useFormState } from 'formwheels';
import FieldErrors from './FieldErrors';
import Checkbox from '../controls/Checkbox';

const Container = styled.div`
  margin: 1rem 0;
`;

const CheckboxField = (props) => {
  const { errors, value, setValue } = useFormState(props);
  return (
    <Container>
      <Checkbox
        {...props}
        label={props.label}
        onChange={val => setValue(val)}
        value={value}
      />
      <FieldErrors errors={errors} />
    </Container>
  );
};

CheckboxField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
};

CheckboxField.defaultProps = {
  label: undefined,
};

export default CheckboxField;
