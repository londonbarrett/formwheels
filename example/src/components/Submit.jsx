import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useFormState } from 'formwheels';

const Input = styled.input`
  background: ${({ disabled }) => (disabled ? '#AFDBD7' : '#00544C')};
  border: none;
  border-radius: 1rem;
  color: ${({ disabled }) => (disabled ? '#7DB2AD' : '#FFF')};
  font-size: 1rem;
  line-height: 2rem;
  padding: .5rem 2rem;
`;

const Submit = (props) => {
  const { hasErrors } = useFormState();
  return (
    <Input
      type="submit"
      disabled={hasErrors}
      {...props}
    />
  );
};

Submit.propTypes = {
  hasErrors: PropTypes.bool,
};

Submit.defaultProps = {
  hasErrors: false,
};

export default Submit;
