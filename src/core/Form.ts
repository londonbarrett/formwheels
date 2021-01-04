import Field, { FieldProps, Setters } from "./Field";
import Subscriber from "./Subscriber";

// REVIEW: Use a map, remove the hash
export type Hash<T> = {
  [key: string]: T;
}

export type Result = {
  errors: Hash<string>;
  hasErrors: boolean;
  status: string;
  values: Hash<any>
}

export class Form{

  public touched = false;
  private subscribers: Subscriber[] = [];
  private fields: Hash<Field> = {};
  private _isValidating = false;

  // OK, Tested
  public mountField = (props: FieldProps, setters: Setters) => {
    this.fields[props.name] = new Field(props, this);
    this.fields[props.name].mount(setters);
  }

  // OK, tested
  public unmountField = (props: FieldProps) => this.fields[props.name]!.unmount();

  // OK, tested
  public updateFieldValidators = (
    field: string,
    validators: ReadonlyArray<FormWheels.AsyncValidator | FormWheels.Validator>
  ) => {
    this.fields[field].validators = validators;
    this.updateSubscribers();
  }

  // OK, tested
  public getValue = (field: string) =>
    this.fields[field] && this.fields[field].value;

  // OK, tested
  public  setValue = (
    field: string,
    value: any
  ) => {
    this.fields[field].value = value;
    this.fields[field].validate();
    this.touched = true;
    this.updateSubscribers();
  };

  // OK, tested
  public subscribe = (subscriber: Subscriber) =>
    !this.subscribers.find((item: Subscriber) => item === subscriber) && [
      this.subscribers.push(subscriber),
      subscriber.update(this)
    ];

  // OK, NEEDS TESTING
  public unsubscribe = (subscriber: Subscriber) => {
    this.subscribers = this.subscribers.filter(
      item => item !== subscriber
    );
  };

  // OK, needs testing
  public resetAll = () => {
    this.touched = false;
    this.resetAllFields();
    this.updateSubscribers();
  };

  // OK, needs testing
  public resetMounted = () => {
    this.touched = false;
    this.resetMountedFields();
    this.updateSubscribers()
  }

  // OK, tested
  get hasErrors() {
    return Object.keys(this.fields).some(
      key => this.fields[key].errors.length > 0
    );
  }

  // OK, tested
  get errors() {
    return Object.keys(this.fields).reduce(
      (acc, key) => {
        acc[key] = this.fields[key].errors;
        return acc;
      },
      {}
    );
  }

  // OK, tested
  get values() {
    return Object.keys(this.fields).reduce(
      (acc, key) => {
        acc[key] = this.fields[key].value;
        return acc;
      },
      {}
    );
  }

  get isValidating() {
    return this._isValidating;
  }

  // REVIEW: Should it be public?
  private validate = async (): Promise<any> => {
    this._isValidating = true;
    this.updateSubscribers();
    for (const field in this.fields) {
      await this.fields[field].validateSync();
    }
    this._isValidating = false;
    this.updateSubscribers();
    return this;
  }

  // OK, needs testing
  public submit = (): Promise<any> => {
    this.touched = true;
    return this.validate();
  }

  // OK, tested
  public isFieldTouched = (field: string) =>
    this.fields[field] && this.fields[field].touched;

  // NEEDS REVIEW
  public clear = () => {
    this.touched = false;
  }

  // OK
  public updateSubscribers = () =>
    this.subscribers.forEach(
      subscriber => subscriber.update(this)
    );

  // OK, testes
  private resetMountedFields = () =>
    Object.keys(this.fields).forEach(
      key => this.fields[key].mounted && this.fields[key].reset()
    );

  private resetAllFields = () =>
    Object.keys(this.fields).forEach(
      key => this.fields[key].reset()
    );
}

export default Form;
