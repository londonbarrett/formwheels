import { useContext, useEffect, useState } from 'react';
import { Context } from '../components/Context';
import Field from '../components/Field';
import { IFormState } from '../components/FormState';

export interface IUseFieldHook {
  errors: ReadonlyArray<string>;
  touched: Readonly<boolean>;
  value: Readonly<any>;
  hasErrors: Readonly<boolean>;
  setValue: (value: Readonly<any>) => void;
}

export interface IFieldProps {
  name: Readonly<string>;
  onChange?: (event: any) => void;
  validators?: ReadonlyArray<(...args: any[]) => boolean>;
  value?: any;
}

const useFieldHook = (props: IFieldProps) => {
  const context = useContext<IFormState>(Context);
  const [errors, setErrors] = useState();
  const [touched, setTouched] = useState(false);
  const initialValue = context.getValue(props.name) || props.value;
  const [value, setValue] = useState(initialValue);
  const NAME_ERROR = 'useFormState requires property name when using fields';
  useEffect(() => {
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
      props.validators,
      context.isFieldRegistered(props.name)
        ? context.getValue(props.name)
        : value,
    );
    context.registerField(field);
    return () => context.unregisterField(props.name);
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
    hasErrors: errors && !!errors.length,
    setValue: setContextValue
  };
};

export default useFieldHook;
