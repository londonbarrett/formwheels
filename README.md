# React FormWheels

## TODOS

- Finish checkbox control.

[![NPM](https://img.shields.io/npm/v/formwheels.svg)](https://www.npmjs.com/package/formwheels) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-airbnb-brightgreen.svg)](https://github.com/airbnb/javascript)

> React hooks: You need React@16.8 for using hooks.

FormWheels is a library for dealing with forms in React with hooks.
It allows you to manage Form State with controlled components in an easy
and expressive way. It was developed having in mind performance and
developer experience,

## Features

- Performant: It doesn't re-render all the form, just the component that
is being updated.
- Flexible: You can use it with almost every UI-Kit library, as soon as
your components are controlled.
- Validation: Validate your fields without effort, basic validators
included.
- Expressive: Compose your forms in an easy and expressive way.

## Install

```bash
npm install --save formwheels
```

## Usage

For start working, you need to connect your controlled components to
the form state with the useFormState hook, this hook provides some
methods and properties for connecting with the form state.

After you have defined your fields, then you compose your form with the
Form component in a similar way you do it with plain html.

here you can define a submit handler, so you have
access to the form values.

### Fields

You need to connect every field to the form state by using the value and
setValue coming from useFormState, in the case of Fields, you must provide
the props to the hook and your control should have a name property, so
the Form State can reference your control.

```js
const { hasErrors, errors, setValue, touched, value } = useFormState(props);
```

additionaly you can display errors and check if the field has
been touched.

```js
// InputField.js

import React from 'react';
import { useFormState } from 'formwheels';

const InputField = (props) => {
  const { hasErrors, errors, setValue, touched, value } = useFormState(props);
  return (
    <div>
      <label>{props.label}</label>
      <input
        {...props}
        onChange={event => setValue(event.target.value)}
        value={value}
      />
      {hasErrors && (
        <ul>
          {errors.map(
            error => (
              <li>{error}</li>
            )
          )}
        </ul>
      )}
    </div>
  );
};

export default InputField;
```

### General FormState

If you need to watch over the general Form State, for accessing values
and errors on the complete form, then you can create a component and
connect it with useFormState without sending props. In this case you
will not receive touched, instead you have isDirt.

> Note: It is important to notice the difference between a Field
and a FormState component, depending on what you are working on, you
will receive properties for a Field or the Form.

```js
const { errors, getValue, hasErrors, isDirt, setValue, values } = useFormState();
```

```js
// FormErrors.js

import React from 'react';
import { useFormState } from 'formwheels';

const getErrorList = (errors = {}) =>
  Object.keys(errors).reduce(
    (list, key) => list.concat(errors[key]), []
  );

const FormErrors = () => {
  const { errors, hasErrors } = useFormState();
  // errors is a hash of error arrays, so I use a small function to
  // get an array of errors.
  const errorList = getErrorList(errors);
  const items = errorList.map(error => (
    <ListItem key={error}>
      {error}
    </ListItem>
  ));
  return hasErrors ? (
    <div>
      <h2>
        Form Errors
      </h2>
      <List>
        {items}
      </List>
    </div>
  ) : null;
};

export default FormErrors;
```

### Submit

It's not necessary that you connect the submit button to the form
state, but it can be useful to disable the submit button till the form
is valid.

> Note: Submit component should be a button or input element with type
attribute set to submit, so the Form component fires an onSubmit event.

```js
// Submit.js

import React from 'react';
import { useFormState } from 'formwheels';

const Submit = () => {
  const { hasErrors } = useFormState();
  return <input type="submit" disabled={hasErrors} />;
};

export default Submit;
```

### Form

Once you have created your connected fields, you can compose your form.

> Note: Every Form should have a name.

```js
// CommentForm.js

import React from 'react';
import { Form, validators } from 'formwheels';
import InputField from './InputField';
import Submit from './Submit';

const CommentForm = () => {
  const submitHandler = values => console.log(values);
  return (
    <Form name="comment" onSubmit={submitHandler}>
      <InputField
        label="Name"
        name="name"
        validators={[
          validators.isNotEmpty('First Name should not be empty'),
        ]}
      />
      <InputField
        label="Age"
        name="age"
        validators={[
          validators.isNotEmpty('Age should not be empty'),
          validators.isNumber('Age should be a number'),
          validators.greaterThan(16, 'Age should be over 16'),
        ]}
      />
      <InputField
        label="Comment"
        name="comment"
        validators={[
          validators.isNotEmpty('First Name should not be empty'),
        ]}
        value="My initial comment"
      />
      <Submit/>
    </Form>
  );
};

export default CommentForm;
```

#### Initial Values

You can define field initial values just by setting the value property
on a Field.

```js
// CommentForm fragment ..

<InputField
  label="Comment"
  name="comment"
  validators={[
    validators.isNotEmpty('First Name should not be empty'),
  ]}
  value="My initial comment"
/>
```

#### Form Submit

You can define a Form onSubmit event handler to access the values when
the form is submitted.

```js
// CommentForm fragment ..

const submitHandler = values => console.log(values);
  return (
    <Form name="comment" onSubmit={submitHandler}>
```

> Note: To submit a form, you need to have a submit input or button
inside your form.

#### Field Validation

You can set an array of validators for a field with the validators
property, this library already comes with some basic validators that
you can use out of the box.

```js
// CommentForm fragment ...

<InputField
  label="Age"
  name="age"
  validators={[
    validators.isNotEmpty('Age should not be empty'),
    validators.isNumber('Age should be a number'),
    validators.greaterThan(16, 'Age should be over 16'),
  ]}
/>
```

## Special Use Cases

### Setting initial values

### Modifying field values programmatically

### Getting access to FormState values

### Dynamic validation

## API Reference

### Form Component

The Form component is a context wrapper that holds the FormState, you
need to wrapp all of your forms with this components, so you have
access to the FormState.

#### name

Every form needs a name.

### onSubmit(values)

Callback when the form is submitted, you receive the values of the form.

### useFormState Hook

The useFormState is a hook that gives you access to the FormState. You
can use the hook in two ways:

Connecting Fields: Connects fields to the Form State. For this you need
to send the properties comming from the Control, like explained before.

Accessing Form State: Access to the entire Form State. For this you use
the hook without sending any props. Like explained before.

#### errors

#### hasErrors

#### isDirt

#### setValue

#### touched

#### value

### FormState

FormState is the core of the library, although you don't access it
directly, it lives in the context of the Form component, and is
responsible of handling the state of the form and validation. You can
access the FormState on the onChange events dispatched by fields
connected to the Form State.

errors:
hasErrors:
isDirt:
values:

clear():
getValue(field: string):
isFieldRegistered(field: string):
isFieldTouched(field: string):
registerField(field: Field):
reset():
setValue(field: string, value: any, process?: boolean):
subscribe(subscriber: Subscriber):
unregisterField(field: string):
unsubscribe(subscriber:Subscriber):
updateFieldValidators(field: string, validators: Function[]):
validate():

## License

MIT © [londonbarrett](https://github.com/londonbarrett)
