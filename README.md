# React FormWheels

> React hooks: You need React@16.8 for using hooks.

FormWheels is a library for dealing with forms in React with hooks.
It allows you to manage form state with controlled components in an easy
and expressive way. It was developed having in mind performance and
developer experience,

## Features

- Performant: It doesn't re-render all the form, just the component that
is being updated.
- Flexible: You can use it with almost every UI-Kit library, as soon as
your components are controlled.
- Validation:
- Expressive

[![NPM](https://img.shields.io/npm/v/formwheels.svg)](https://www.npmjs.com/package/formwheels) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save formwheels
```

## Usage

For start working, it is necessary that you wrap your form with the Form
component, then

### Fields

You need to connect every field to the form state by using value and
setValue, additionaly you can display errors and check if the field has
been touched.

```js
import React from 'react';
import { useFormState } from 'formwheels';

const Input = (props) => {
  const { errors, setValue, touched, value } = useFormState(props);
  return (
    <div>
      <label>{props.label}</label>
      <input
        {...props}
        onChange={event => setValue(event.target.value)}
        value={value}
      />
      <ul>
        {errors.map(
          error => (
            <li>{error}</li>
          )
        )}
      </ul>
    </div>
  );
};

export default Input;
```

### Submit

```js
import React from 'react';

const Submit = () => {
  const { hasErrors } = useFormState();
  return <input type="submit" disabled={hasErrors} />;
};

export default Submit;
```

### Form

Once you have created your connected fields, you can compose your form

> Warning: Every Form should have a name.

```js
import React from 'react';
import { Form, validators } from 'formwheels';

const CommentForm = () => (
  <Form name="comment">
    <Input
      label="Name"
      name="name"
      validators={[
        validators.isNotEmpty('First Name should not be empty'),
      ]}
    />
    <Input
      label="Age"
      name="age"
      validators={[
        validators.isNotEmpty('Age should not be empty'),
        validators.isNumber('Age should be a number'),
        validators.greaterThan(16, 'Age should be over 16'),
      ]}
    />
    <Input
      label="Comment"
      name="comment"
      validators={[
        validators.isNotEmpty('First Name should not be empty'),
      ]}
    />
    <Submit/>
  </Form>
);

export default CommentForm;
```

## API Reference

### Form Component

The Form component is basically a context wrapper that holds the FormState,
you need to wrapp all of your forms with this components, so you have access
to the FormState.

### useFormState Hook

The useFormState is a hook that gives you access to the FormState

### FormState

FormState is the core of the library, although you don't access it directly,
it lives in the context of the Form component, and is responsible of handling
the state of the form and validation.

## License

MIT © [londonbarrett](https://github.com/londonbarrett)
