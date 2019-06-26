import * as PropTypes from 'prop-types';
import * as React from 'react';
import { Context } from './Context';
import { IFormProps } from './Form';

const FormWrapper: React.FC<IFormProps> = ({
  children,
  className,
  name,
  onSubmit,
}) => {
  const context = React.useContext(Context);
  React.useEffect(() => {
    return () => {
      context.clear();
    }
  }, []);
  const submitHandler = (event: React.SyntheticEvent) => {
    event.preventDefault();
    context.validate();
    if (!context.hasErrors && onSubmit) {
      onSubmit(context.values);
    }
  };
  const resetHandler = () => context.reset();
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
