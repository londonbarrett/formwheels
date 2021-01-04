import * as PropTypes from "prop-types";
import * as React from "react";
import { Provider } from "./Context";
import FormWrapper from './FormWrapper';

export type FormProps = {
  children: React.ReactNode;
  className?: string;
  name: string;
  onSubmit?: (values: {}) => void;
  onValidation?: () => void;
}

const Form: React.FC<FormProps> = ({
  children,
  className,
  name,
  onSubmit
}) => {
  return (
    <Provider formName={name}>
      <FormWrapper
        className={className}
        name={name}
        onSubmit={onSubmit}
      >
        {children}
      </FormWrapper>
    </Provider>
  );
};

Form.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  onSubmit: PropTypes.func
};

Form.defaultProps = {
  className: undefined,
  onSubmit: undefined
};

export default Form;
