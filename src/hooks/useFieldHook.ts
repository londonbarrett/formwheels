import { useContext, useEffect, useState } from 'react';
import { Context } from '../components/Context';
import { Form } from '../core/Form';
import { FieldProps } from '../core/Field';

const useFieldHook = (props: FieldProps) => {
  const context = useContext<Form>(Context);
  const [errors, setErrors] = useState<String[]>([]);
  const [touched, setTouched] = useState<Boolean>(false);
  const initialValue = context.getValue(props.name) || props.value;
  const [value, setValue] = useState(initialValue);
  // TODO: Move error codes to a single file
  const NAME_ERROR = 'useFormState requires property name when using fields';
  if (!props.name) {
    throw new Error(NAME_ERROR);
  }
  useEffect(() => {
    context.mountField(
      props,
      {
        setErrors,
        setTouched,
        setValue
      }
    );
    return () => {
      context.unmountField(props);
    }
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

  return {
    errors,
    touched,
    value,
    hasErrors: !!errors!.length,
    setValue: setContextValue
  };
};

export default useFieldHook;
