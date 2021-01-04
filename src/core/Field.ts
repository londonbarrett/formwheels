import Form from "./Form";

export type Setters = {
  setErrors: Function;
  setValue: Function;
  setTouched: Function;
};

export type FieldProps = {
  name: Readonly<string>;
  onChange?: (event: any) => void;
  validators?: ReadonlyArray<FormWheels.AsyncValidator | FormWheels.Validator>;
  value?: any;
}

// TODO: add initial validators

class Field {

  public errors: string[] = [];
  public initialValue: any;
  public name: string;
  public setters: Setters | undefined;
  public touched: boolean = false;
  public validators: ReadonlyArray<FormWheels.AsyncValidator | FormWheels.Validator>;
  public value: any;

  private form: Readonly<Form>;

  constructor (props: FieldProps, form: Form) {
    this.initialValue = props.value;
    this.form = form;
    this.name = props.name;
    this.validators = props.validators || [];
    this.value = props.value;
  }

  public updateValidators(
    validators: ReadonlyArray<FormWheels.AsyncValidator | FormWheels.Validator>
  ) {
    this.validators = validators;
    this.validate();
  }

  get mounted() {
    return !!this.setters;
  }

  public reset = () => {
    this.value = this.initialValue;
    this.errors = [];
    this.touched = false;
    this.update();
  }

  public clear = () => {
    this.value = undefined;
    this.errors = [];
    this.touched = false;
    this.update();
  }

  public validate = () => {
    // 1. split sync and async, async validators are called when splitting.
    // 2. validate sync errors
    // 3. re validate sync every time promises fulfill
    this.errors = [];
    const syncValidators: any[] = [];
    const asyncValidators = [];
    for (const validator of this.validators) {
      const validation = validator(this.value, this.form.values);
      if (validation instanceof Promise) {
        asyncValidators.push(validation);
      }
      else {
        syncValidators.push(validator);
        validation && this.errors.push(validation);
      }
    }
    // REVIEW: implement cancellable promises
    if (!this.errors.length && asyncValidators.length) {
      Promise.all(asyncValidators).then((result) => {
        this.errors = syncValidators
          .map(validator => validator(this.value, this.form.values))
          .filter(validation => validation);
        const msgs = result.filter(validation => validation);
        this.errors = this.errors.concat(msgs as string[]);
        this.update();
        this.form.updateSubscribers();
        // REVIEW: should dispatch an event, should return a promise?
      });
    }
    // REVIEW: Should it be set to touched when validated?
    this.touched = true;
    this.update();
  }

  public validateSync = async () => {
    this.errors = await Promise.all(
      this.validators.map(
        validator => validator(this.value, this.form.values)
      ).filter(message => message)
    );
    // REVIEW:
    // - Should it be set to touched when validated?
    // - Should it return something?
    this.touched = true;
    this.update();
  }

  public mount = (setters: Setters) => {
    this.setters = setters;
    this.touched && this.validate();
  }

  public unmount = () => {
    this.setters = undefined;
  }

  private update = () => this.setters && [
    this.setters.setErrors(this.errors),
    this.setters.setValue(this.value),
    this.setters.setTouched(this.touched),
  ]

}

export default Field;
