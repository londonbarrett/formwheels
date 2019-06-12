import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SInput = styled.input`
  background: ${({ hasErrors }) => (hasErrors ? '#FF544C' : '#FFF')}
  border: none;
  border-radius: 1rem;
  color: ${({ hasErrors }) => (hasErrors ? '#FFF' : '#007367')}
  font-size: 1rem;
  line-height: 2rem;
  padding: .5rem 1rem;
  width: 100%;
`;

class Input extends React.Component {
  handleOnChange = (event) => {
    const { onChange } = this.props;
    onChange(event);
  }

  render() {
    return (
      <SInput
        {...this.props}
        type="text"
        onChange={this.handleOnChange}
      />
    );
  }
}

Input.propTypes = {
  hasErrors: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.string,
};

Input.defaultProps = {
  hasErrors: false,
  onChange: undefined,
  value: '',
};

export default Input;
