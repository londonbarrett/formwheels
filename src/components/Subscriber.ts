class Subscriber {
  public setErrors: Function;
  public setHasErrors: Function;
  public setIsDirt: Function;
  public setValues: Function;
  constructor(
    setErrors: Function,
    setHasErrors: Function,
    setIsDirt: Function,
    setValues: Function,
  ) {
    this.setErrors = setErrors;
    this.setHasErrors = setHasErrors;
    this.setIsDirt = setIsDirt;
    this.setValues = setValues;
  }
  public update = (
    errors: {},
    hasErrors: boolean,
    isDirt: boolean,
    values: {}
  ) => {
    this.setErrors(errors);
    this.setHasErrors(hasErrors);
    this.setIsDirt(isDirt);
    this.setValues(values)
  }
}

export default Subscriber;
