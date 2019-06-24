import PropTypes from 'prop-types';
import * as React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  background: #00BFAC;
  border: none;
  border-radius: 1rem;
  color: #FFF;
  font-size: 1rem;
  line-height: 2rem;
  padding: .5rem 2rem;
`;

const Reset = ({ children }) => (
  <Button type="reset">{children}</Button>
);

Reset.propTypes = {
  children: PropTypes.node,
};

Reset.defaultProps = {
  children: 'Reset',
};

export default Reset;
