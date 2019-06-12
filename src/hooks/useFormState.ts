import { useContext, useEffect, useState } from "react";
import { Context } from "../components/Context";
import { IFormState } from "../components/FormState";

const useFormState = () => {
  const [errors, setErrors] = useState();
  const [hasErrors, setHasErrors] = useState();
  const [isDirt, setIsDirt] = useState();
  const [values, setValues] = useState();
  const context = useContext<IFormState>(Context);

  // [ ] Unsubscribe
  useEffect(() => {
    context.subscribe({
      setErrors,
      setHasErrors,
      setIsDirt,
      setValues
    });
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
