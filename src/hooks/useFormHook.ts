import { useContext, useEffect, useState } from 'react';
import { Context } from '../components/Context';
import { Form, Hash } from '../core/Form';
import Subscriber from '../core/Subscriber';

// REVIEW: Should I replace this with the form object - class?
export type FormState = {
  errors: ReadonlyArray<string>;
  hasErrors: Readonly<boolean>;
  getValue: (field: string) => any;
  isDirt: Readonly<boolean>;
  isValidating: Readonly<boolean>;
  setValue: (field: string, value: Readonly<any>, process: boolean) => void;
  submit: () => void;
  values: Hash<any>;
}
// const useFormState = (): FormState => {

const useFormState = (): FormState => {
  const context = useContext<Form>(Context);
  const [errors, setErrors] = useState([]);
  const [hasErrors, setHasErrors] = useState(false);
  const [isDirt, setIsDirt] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [values, setValues] = useState({});
  useEffect(() => {
    const subscriber = new Subscriber(
      setErrors,
      setHasErrors,
      setIsDirt,
      setIsValidating,
      setValues,
    );
    context.subscribe(subscriber);
    return () => context.unsubscribe(subscriber);
  }, []);

  return {
    errors,
    hasErrors,
    isDirt,
    isValidating,
    values,
    getValue: context.getValue,
    setValue: context.setValue,
    submit: context.submit,
  };
};

export default useFormState;
