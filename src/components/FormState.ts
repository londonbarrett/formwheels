export interface IRegisterArgs {
  name: string;
  onChange?: Function;
  validators?: Function[] | undefined;
  value: any;
  setErrors(errors: string[]): void;
  setTouched(touched: boolean): void;
  setValue(value: any): void;
}

export interface IFormState {
  subscribe: Function;
  unsubscribe: Function;
  getValue: (field: string) => any;
  setValue: (
    field: string,
    value: any
  ) => void;
  registerField(fieldProps: IRegisterArgs): void;
  unregisterField(name: string): void;
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
        validators,
      };
      this.setInitialValue(name, value);
      this.errors[name] = [];
    }
  };

  public unregisterField = (name: string) => {
    delete this.fields[name];
  };

  public updateFieldValidators = (field: string, validators: Function[]) => {
    this.fields[field].validators = validators;
    this.validateField(field);
    this.updateField(field);
    this.updateSubscribers();
  }

  public getValue = (field: string) => this.values[field];

  public setValue = (field: string, value: any) => {
    this.values[field] = value;
    this.isDirt = true;
    this.validateField(field);
    this.updateField(field);
    this.updateSubscribers();
  };

  public validateForm = () => {
    Object.keys(this.fields).forEach(key => {
      const field = this.fields[key];
      this.validateField(key);
      // CHECK
      field.setErrors(this.errors[key]);
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

  public unsubscribe = (setters: any) => {
    this.subscribers = this.subscribers.filter(
      subscriber => subscriber !== setters
    );
  };

  public resetForm = () => {
    this.isDirt = false;
    this.errors = {};
    this.resetFields();
    this.updateSubscribers();
  };

  public clearForm = () => {
    this.errors = {};
    this.values = {};
    this.isDirt = false;
    this.initialValues = {};
  }

  get hasErrors() {
    return !!Object.keys(this.errors).reduce((acc, key) => {
      const total = acc + this.errors[key].length;
      return total;
    }, 0);
  }

  private updateField = (field: string) => {
    this.fields[field].setValue(this.values[field]);
    this.fields[field].setTouched(true);
    this.fields[field].setErrors(this.errors[field]);
  }

  private setInitialValue = (field: string, value: any) => {
    this.values[field] = value;
    this.initialValues[field] = value;
  };

  private validateField = (field: string) => {
    const validators = this.fields[field].validators || [];
    this.errors[field] = validators.reduce(
      (acc: string[], validator: Function) => {
        const validation = validator(this.values[field]);
        if (validation) {
          acc.push(validation);
        }
        return acc;
      },
      [],
    );
  };

  private updateSubscribers = () => {
    this.subscribers.forEach(subscriber => {
      subscriber.setErrors(this.errors);
      subscriber.setHasErrors(this.hasErrors);
      subscriber.setIsDirt(this.isDirt);
      console.log('FORM_STATE:VALUES', this.values);
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
