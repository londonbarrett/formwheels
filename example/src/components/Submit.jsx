import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useFormState } from 'formwheels';
import Spinner from './Spinner';

const Button = styled.button`
  background: ${({ disabled }) => (disabled ? '#AFDBD7' : '#00544C')};
  border: none;
  border-radius: 1rem;
  color: ${({ disabled }) => (disabled ? '#7DB2AD' : '#FFF')};
  font-size: 1rem;
  line-height: 2rem;
  padding: .5rem 2rem;
`;

const Submit = (props) => {
  const { onClick } = props;
  const { hasErrors, isValidating, submit } = useFormState();
  const clickHandler = async () => {
    if (!isValidating) {
      const result = await submit();
      console.log('RESULT', result);
      !result.hasErrors && onClick && onClick(result);
    }
  }
  return (
    <Button
      {...props}
      disabled={hasErrors}
      onClick={clickHandler}
      type="submit">
        {isValidating
          ? <Spinner/>
          : props.value
        }
    </Button>
  );
};

Submit.propTypes = {
  onClick: PropTypes.func,
};

Submit.defaultProps = {
  onClick: undefined
};

export default Submit;
