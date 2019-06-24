import { useContext, useEffect, useState } from 'react';
import { Context } from '../components/Context';
import { IFormState } from '../components/FormState';

const useFormState = (props: any) => {
  const [errors, setErrors] = useState();
  const [hasErrors, setHasErrors] = useState(false);
  const [isDirt, setIsDirt] = useState(false);
  const [touched, setTouched] = useState(false);
  const [value, setValue] = useState(props && props.value);
  const [values, setValues] = useState({});
  const context = useContext<IFormState>(Context);
  const NAME_ERROR = 'useFormState requires property name when using fields';

  useEffect(() => {
    if (props) {
      if (!props.name) {
        throw new Error(NAME_ERROR);
      }
      context.registerField({
        setErrors,
        setTouched,
        setValue,
        value,
        name: props.name,
        validators: props.validators
      });
      return () => context.unregisterField(props.name);
    }
    const subscriber = {
      setErrors,
      setHasErrors,
      setIsDirt,
      setValues
    };
    context.subscribe(subscriber);
    return () => context.unsubscribe(subscriber);
  }, [props]);

  const setContextValue = (newValue: any) => {
    context.setValue(props.name, newValue);
    if (props.onChange) {
      props.onChange({
        context,
        errors,
        name,
        touched,
        value: newValue
      });
    }
  };

  if (props) {
    return {
      errors,
      touched,
      value,
      hasErrors: errors && !!errors.length,
      setValue: setContextValue
    };
  }
  return {
    errors,
    hasErrors,
    isDirt,
    values,
    getValue: context.getValue,
    setValue: context.setValue
  };
};

export default useFormState;
