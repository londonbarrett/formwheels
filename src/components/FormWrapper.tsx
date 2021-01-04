import * as PropTypes from 'prop-types';
import * as React from 'react';
import { Context } from './Context';
import { FormProps } from './Form';

const FormWrapper: React.FC<FormProps> = ({
  children,
  className,
  name,
  // onSubmit,
}) => {
  const context = React.useContext(Context);
  React.useEffect(() => {
    return () => {
      context.clear();
    }
  }, []);
  // REVIEW: should general form submit be keeped?
  const submitHandler = (event: React.SyntheticEvent) => {
    event.preventDefault();
    // onSubmit && onSubmit(context.submit())
  };
  const resetHandler = () => context.resetMounted();
  return (
    <form
      onReset={resetHandler}
      onSubmit={submitHandler}
      className={className}
      name={name}
    >
      {children}
    </form>
  );
};

FormWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  onSubmit: PropTypes.func
};

FormWrapper.defaultProps = {
  className: undefined,
  onSubmit: undefined
};

export default FormWrapper;
