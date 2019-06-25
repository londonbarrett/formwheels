import React from 'react';
import styled from 'styled-components';
import { useFormState } from 'formwheels';
import { getErrorList } from '../util/forms';

const List = styled.ul`
  list-style-position: inside;
  margin-top: .5rem;
  padding-left: 1rem;
  text-align: left;
`;

const ListItem = styled.li`
  font-size: .7rem;
`;

const FormErrors = () => {
  const { errors, hasErrors } = useFormState();
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
