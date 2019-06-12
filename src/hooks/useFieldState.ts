import { useContext, useEffect, useState } from "react";
import { Context } from "../components/Context";
import { IFormState } from "./../components/FormState";

// [X] Set values on context
// [X] Validate values
// [X] Set errors
// [X] Subscribers
// [X] Change other fields: register fields
// [X] Initial values
// [X] Meta data
// [X] set field error ui
// [X] Rename to useFieldState
// [X] Rename library to formwheels
// [ ] Check for name exception.
// [ ] Unregister
// [ ] Update fields after submit validation

interface IUseFieldStateArgs {
  name: string;
  onChange?: Function;
  validators?: Function[];
  value: any;
}

const useFieldState = ({
  name,
  onChange,
  validators,
  value: initialValue
}: IUseFieldStateArgs) => {
  const [errors, setErrors] = useState();
  const [touched, setTouched] = useState(false);
  const [value, setValue] = useState(initialValue);
  const context = useContext<IFormState>(Context);

  useEffect(
    () =>
      context.registerField({
        name,
        setErrors,
        setTouched,
        setValue,
        validators,
        value
      }),
    []
  );

  const setContextValue = (newValue: any) => {
    context.setValue(name, newValue, validators);
    if (onChange) {
      onChange({
        context,
        errors,
        name,
        touched,
        value: newValue
      });
    }
  };

  return {
    errors,
    touched,
    value,
    hasErrors: errors && !!errors.length,
    setValue: setContextValue
  };
};

export default useFieldState;
