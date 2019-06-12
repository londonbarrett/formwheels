export type FieldType = {
  name: string;
  validators: Function[] | undefined;
  value: any;
  setErrors(errors: string[]): void;
  setTouched(touched: boolean): void;
  setValue(value: any): void;
};

export interface IFormState {
  subscribe: Function;
  getValue: (field: string) => any;
  setValue: (
    field: string,
    value: any,
    validators: Function[] | undefined
  ) => void;
  registerField(field: FieldType): void;
}

class FormState implements IFormState {
  public errors = {};
  public isDirt = false;
  public values = {};

  private subscribers: any[] = [];
  private initialValues = {};
  private fields = {};

  public registerField = ({
    name,
    setErrors,
    setTouched,
    setValue,
    validators,
    value
  }: any) => {
    if (!this.fields[name]) {
      this.fields[name] = {
        setErrors,
        setTouched,
        setValue,
        validators
      };
      this.setInitialValue(name, value);
    }
  };

  public getValue = (field: string) => this.values[field];

  public setValue = (field: string, value: any, validators: Function[]) => {
    this.values[field] = value;
    this.isDirt = true;
    const inputErrors = this.validateInput(value, validators);
    this.errors[field] = inputErrors;
    this.fields[field].setValue(value);
    this.fields[field].setTouched(true);
    this.fields[field].setErrors(inputErrors);
    this.updateSubscribers();
  };

  public validateForm = () => {
    Object.keys(this.fields).forEach(key => {
      const field = this.fields[key];
      this.errors[key] = this.validateInput(this.values[key], field.validators);
    });
    this.updateSubscribers();
    return !this.hasErrors;
  };

  public subscribe = (setters: any) => {
    if (
      !this.subscribers.find(
        (item: any) => item.setErrors === setters.setErrors
      )
    ) {
      this.subscribers.push(setters);
    }
  };

  public getErrorsList = () =>
    Object.keys(this.errors).reduce((list, key) => {
      this.fields[key].setErrors(this.errors[key]);
      return list.concat(this.errors[key]);
    }, []);

  // Needs review
  public resetForm = () => {
    this.isDirt = false;
    this.errors = {};
    this.resetFields();
    this.updateSubscribers();
  };

  get hasErrors() {
    return !!Object.keys(this.errors).reduce((acc, key) => {
      const total = acc + this.errors[key].length;
      return total;
    }, 0);
  }

  private setInitialValue = (field: string, value: any) => {
    this.values[field] = value;
    this.initialValues[field] = value;
  };

  private validateInput = (value: string, validators: Function[]) => {
    const errors =
      validators &&
      validators.reduce((acc: string[], validator) => {
        const validation = validator(value);
        if (validation) {
          acc.push(validation);
        }
        return acc;
      }, []);
    return errors || [];
  };

  private updateSubscribers = () => {
    this.subscribers.forEach(subscriber => {
      subscriber.setErrors(this.errors);
      subscriber.setHasErrors(this.hasErrors);
      subscriber.setIsDirt(this.isDirt);
      subscriber.setValues(this.values);
    });
  };

  private resetFields = () => {
    Object.keys(this.fields).forEach(key => {
      const field = this.fields[key];
      field.setErrors([]);
      field.setTouched(false), field.setValue(this.initialValues[key]);
    });
  };
}

export default FormState;
