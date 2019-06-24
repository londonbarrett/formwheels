class Field {
  public errors: string[] = [];
  public initialValue: any;
  public name: string;
  public setters = {};
  public validators = [];
  public value: any;
}

export default Field;