import React from 'react';
import Form from './ContextForms/Form';
import TextfieldInput from './inputs/TextfieldInput';

const UserForm = () => (
  <Form name="comment">
    <TextfieldInput id="firstName1" name="firstName" />
  </Form>
);

export default UserForm;
