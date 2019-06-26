import { useContext, useEffect, useState } from 'react';
import { Context } from '../components/Context';
import Field from '../components/Field';
import { IFormState } from '../components/FormState';
import Subscriber from '../components/Subscriber';

const useFormState = (props: any) => {
  const context = useContext<IFormState>(Context);
  const [errors, setErrors] = useState();
  const [hasErrors, setHasErrors] = useState(false);
  const [isDirt, setIsDirt] = useState(false);
  const [touched, setTouched] = useState(false);
  const [values, setValues] = useState({});
  const initialValue = props && (context.getValue(props.name) || props.value);
  const [value, setValue] = useState(initialValue);
  const NAME_ERROR = 'useFormState requires property name when using fields';
  useEffect(() => {
    if (props) {
      if (!props.name) {
        throw new Error(NAME_ERROR);
      }
      const field = new Field(
        props.name,
        {
          setErrors,
          setTouched,
          setValue,
        },
        context.isFieldTouched(props.name),
        context.isFieldRegistered(props.name)
          ? context.getValue(props.name)
          : value,
        props.validators,
      );
      context.registerField(field);
      return () => context.unregisterField(props.name);
    }
    const subscriber = new Subscriber(
      setErrors,
      setHasErrors,
      setIsDirt,
      setValues,
    );
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
