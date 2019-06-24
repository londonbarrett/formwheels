import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const SButton = styled.button`
  background: ${({ disabled }) => (disabled ? '#AFDBD7' : '#00544C')};
  border: none;
  border-radius: 1rem;
  color: ${({ disabled }) => (disabled ? '#7DB2AD' : '#FFF')};
  font-size: 1rem;
  line-height: 2rem;
  padding: .5rem 2rem;
`;

const Button = ({ children, disabled, ...props }) => (
  <SButton {...props} disabled={disabled} type="button">{children}</SButton>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  disabled: false,
};

export default Button;
