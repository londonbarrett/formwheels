declare namespace FormWheels {
    type Validator = (value: any, values?: any) => string;
    type AsyncValidator = (value: any, values?: any) => Promise<string>;
}
