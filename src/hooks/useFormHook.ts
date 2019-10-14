import { useContext, useEffect, useState } from 'react';
import { Context } from '../components/Context';
import { IFormState } from '../components/FormState';
import Subscriber from '../components/Subscriber';

export interface IUseFormHook {
  errors: ReadonlyArray<string>;
  touched: Readonly<boolean>;
  hasErrors: Readonly<boolean>;
  isDirt: Readonly<boolean>;
  setValue: (field: string, value: Readonly<any>, process: boolean) => void;
}

const useFormState = () => {
  const context = useContext<IFormState>(Context);
  const [errors, setErrors] = useState();
  const [hasErrors, setHasErrors] = useState(false);
  const [isDirt, setIsDirt] = useState(false);
  const [values, setValues] = useState({});
  useEffect(() => {
    const subscriber = new Subscriber(
      setErrors,
      setHasErrors,
      setIsDirt,
      setValues,
    );
    context.subscribe(subscriber);
    return () => context.unsubscribe(subscriber);
  }, []);

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
