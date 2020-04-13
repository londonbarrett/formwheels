import { IForm } from "./Form";

interface ISetters {
  setErrors: Function;
  setValue: Function;
  setTouched: Function;
};

class Field {
  public errors: string[] = [];
  public initialValue: any;
  public mounted = true;
  public name: string;
  public setters: ISetters;
  public touched: boolean;
  private formState: IForm;
  private _validators?: ReadonlyArray<(value: any, formState:IForm) => boolean | string>;
  private _value: any;
  constructor (
    formState: IForm,
    name: string,
    setters: ISetters,
    touched: boolean,
    validators?: ReadonlyArray<(value: any, formState:IForm) => boolean | string>,
    value?: any,
  ) {
    this.formState = formState;
    this.name = name;
    this.setters = setters;
    this.touched = touched;
    this._value = value;
    this.initialValue = value;
    this._validators = validators;
    this.touched && this.validate();
  }
  set validators(validators) {
    this._validators = validators;
    this.validate();
  }
  get validators() {
    return this._validators;
  }
  set value(value) {
    this._value = value;
    this.validate();
  }
  get value() {
    return this._value;
  }
  public reset = () => {
    this._value = this.initialValue;
    this.errors = [];
    this.touched = false;
    this.update();
  }
  public clear = () => {
    this._value = undefined;
    this.errors = [];
    this.touched = false;
    this.update();
  }
  public validate = () => {
    this.errors = this.validators && this.validators.reduce(
      (acc: string[], validator: Function) => {
        const validation = validator(this.value, this.formState);
        if (validation) {
          acc.push(validation);
        }
        return acc;
      },
      [],
    ) || [];
    this.touched = true;
    this.update();
  };
  public setValueNoProcess = (value: any) => this._value = value;
  private update = () => {
    if (this.mounted) {
      this.setters.setErrors(this.errors);
      this.setters.setValue(this._value);
      this.setters.setTouched(this.touched);
    }
  }
}

export default Field;