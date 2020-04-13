import Field from "./Field";
import Subscriber from "./Subscriber";

interface IHash {
  [key: string]: any;
}

export interface IForm {
  errors: {};
  hasErrors: boolean;
  isDirt: boolean;
  values: IHash;
  clear(): void;
  getValue(field: string): any;
  isFieldRegistered(field: string): boolean;
  isFieldTouched(field: string): boolean;
  registerField(field: Field): void;
  reset(): void;
  setValue(field: string, value: any, process?: boolean): void;
  subscribe(subscriber: Subscriber): void;
  unregisterField(field: string): void;
  unsubscribe(subscriber:Subscriber): void;
  updateFieldValidators(field: string, validators: Function[]): void;
  validate(): void;
}

class Form implements IForm {
  public isDirt = false;
  private subscribers: Subscriber[] = [];
  private fields = {};

  public registerField = (field: Field) => {
    this.fields[field.name] = field;
    if (field.touched) field.validate();
  }

  public unregisterField = (field: string) => {
    if (this.fields[field]) this.fields[field].mounted = false;
  }

  public updateFieldValidators = (
    field: string, validators: Function[]
  ) => {
    this.fields[field].validators = validators;
    this.updateSubscribers();
  }

  public getValue = (field: string) =>
    this.fields[field] && this.fields[field].value;

  public setValue = (
    field: string,
    value: any,
    process: boolean = true
  ) => {
    if (process) {
      this.fields[field].value = value;
      this.isDirt = true;
      this.updateSubscribers();
    } else {
      this.fields[field].setValueNoProcess(value);
    }
  };

  public subscribe = (subscriber: Subscriber) => {
    if (!this.subscribers.find(
      (item: Subscriber) => item === subscriber
    )) {
      this.subscribers.push(subscriber);
      subscriber.update(
        this.errors,
        this.hasErrors,
        this.isDirt,
        this.values
      );
    }
  };

  public unsubscribe = (subscriber: Subscriber) => {
    this.subscribers = this.subscribers.filter(
      item => item !== subscriber
    );
  };

  public reset = () => {
    this.isDirt = false;
    this.resetFields();
    this.updateSubscribers();
  };

  get hasErrors() {
    return Object.keys(this.fields).some(
      key => this.fields[key].errors.length
    );
  }

  get errors() {
    return Object.keys(this.fields).reduce(
      (acc, key) => {
        acc[key] = this.fields[key].errors;
        return acc;
      },
      {}
    );
  }

  get values() {
    return Object.keys(this.fields).reduce(
      (acc, key) => {
        acc[key] = this.fields[key].value;
        return acc;
      },
      {}
    );
  }

  public validate = () => {
    this.isDirt = true;
    Object.keys(this.fields).forEach(
      key => this.fields[key].validate()
    );
    this.updateSubscribers();
  }

  public isFieldTouched = (field: string) =>
    this.fields[field] && this.fields[field].touched;

  public isFieldRegistered = (field: string) => !!this.fields[field];

  public clear = () => {
    this.isDirt = false;
    this.fields = {};
  }

  private updateSubscribers = () =>
    this.subscribers.forEach(
      subscriber => subscriber.update(
        this.errors,
        this.hasErrors,
        this.isDirt,
        this.values,
      )
    );

  private resetFields = () =>
    Object.keys(this.fields).forEach(
      key => this.fields[key].reset()
    );
}

export default Form;
