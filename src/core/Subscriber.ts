import Form from "./Form";

class Subscriber {
  public setErrors: Function;
  public setHasErrors: Function;
  public setIsDirt: Function;
  public setIsValidating: Function;
  public setValues: Function;
  constructor(
    setErrors: Function,
    setHasErrors: Function,
    setIsDirt: Function,
    setIsValidating: Function,
    setValues: Function,
  ) {
    this.setErrors = setErrors;
    this.setHasErrors = setHasErrors;
    this.setIsDirt = setIsDirt;
    this.setIsValidating = setIsValidating;
    this.setValues = setValues;
  }
  // REVIEW:
  // - Should I receive a config obj
  // - Should I receive isValidating in the constructor?
  public update = (form: Form) => {
    this.setErrors(form.errors);
    this.setHasErrors(form.hasErrors);
    this.setIsDirt(form.touched);
    this.setIsValidating(form.isValidating);
    this.setValues(form.values)
  }
}

export default Subscriber;
