import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledSelect = styled.select`
  appearance: none;
  background: ${({ hasErrors }) => (hasErrors ? '#FF544C' : '#FFF')};
  border: none;
  border-radius: 1rem;
  color: ${({ hasErrors }) => (hasErrors ? '#FFF' : '#007367')};
  font-size: 1rem;
  height: 3rem;
  line-height: 2rem;
  padding: .5rem 1rem;
  width: 100%;
`;

const Select = ({ onChange, options, value }) => (
  <StyledSelect
    onChange={onChange}
    value={value}
  >
    {options.map(option => (
      <option
        value={option.value}
        key={option.value}
      >
        {option.label}
      </option>
    ))}
  </StyledSelect>
);

Select.propTypes = {
  hasErrors: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.any,
  })).isRequired,
  value: PropTypes.string.isRequired,
};

Select.defaultProps = {
  hasErrors: false,
};

export default Select;
