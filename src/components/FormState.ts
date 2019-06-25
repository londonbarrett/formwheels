import Field from "./Field";
import Subscriber from "./Subscriber";

export interface IFormState {
  errors: {};
  hasErrors: boolean;
  isDirt: boolean;
  values: {};
  getValue(field: string): any;
  setValue(field: string, value: any): void;
  subscribe(subscriber: Subscriber): void;
  unsubscribe(subscriber:Subscriber): void;
  registerField(field: Field): void;
  updateFieldValidators(field: string, validators: Function[]): void;
  resetForm(): void;
}

class FormState implements IFormState {
  public isDirt = false;
  private subscribers: Subscriber[] = [];
  private fields = {};

  public registerField = (field: Field) =>
    this.fields[field.name] = field;

  public updateFieldValidators = (
    field: string, validators: Function[]
  ) => {
    this.fields[field].validators = validators;
    this.updateSubscribers();
  }

  public getValue = (field: string) =>
    this.fields[field] && this.fields[field].value;

  public setValue = (field: string, value: any) => {
    this.fields[field].value = value;
    this.isDirt = true;
    this.updateSubscribers();
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

  public resetForm = () => {
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

  private updateSubscribers = () => this.subscribers.forEach(
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

export default FormState;
