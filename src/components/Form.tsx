import * as PropTypes from "prop-types";
import * as React from "react";
import { Consumer, Provider } from "./Context";

// type Element = PropTypes.ReactElementLike | null;

interface IFormProps {
  children: PropTypes.ReactNodeLike;
  className?: string;
  name: string;
  onSubmit?: (values: {}) => void;
}

const Form: React.FC<IFormProps> = ({
  children,
  className,
  name,
  onSubmit
}) => {
  const submitHandler = (context: any) => (event: React.SyntheticEvent) => {
    event.preventDefault();
    const { validateForm, values } = context;
    if (validateForm() && onSubmit) {
      onSubmit(values);
    }
  };

  const resetHandler = (context: any) => () => context.resetForm();

  return (
    <Provider formName={name}>
      <Consumer>
        {context => (
          <form
            onReset={resetHandler(context)}
            onSubmit={submitHandler(context)}
            className={className}
            name={name}
          >
            {children}
          </form>
        )}
      </Consumer>
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
  className: "",
  onSubmit: undefined
};

export default Form;
