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
  public touched = false;
  private _validators: Function[];
  private _value: any;
  constructor (
    name: string,
    setters: ISetters,
    value?: any,
    validators = []
  ) {
    this.name = name;
    this.setters = setters;
    this._value = value;
    this.initialValue = value;
    this.validators = validators;
  }
  public validate = () => {
    this.errors = this.validators && this.validators.reduce(
      (acc: string[], validator: Function) => {
        const validation = validator(this.value);
        if (validation) {
          acc.push(validation);
        }
        return acc;
      },
      [],
    ) || [];
  };
  public reset = () => {
    this._value = this.initialValue;
    this.errors = [];
    this.touched = false;
    this.update();
  }
  private update = () => {
    if (this.mounted) {
      this.setters.setErrors(this.errors);
      this.setters.setValue(this._value);
      this.setters.setTouched(true);
    }
  }
  set validators(validators) {
    this._validators = validators;
    this.validate();
    this.update();
  }
  get validators() {
    return this._validators;
  }
  set value(value) {
    this._value = value;
    this.touched = true;
    this.validate();
    this.update();
  }
  get value() {
    return this._value;
  }
}

export default Field;