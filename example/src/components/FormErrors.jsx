import React from 'react';
import styled from 'styled-components';
import { useFormState } from 'formwheels';

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
  const { errors } = useFormState();
  if (errors && errors.length) {
    const items = errors.map(error => (
      <ListItem key={error}>
        {error}
      </ListItem>
    ));
    return (
      <div>
        <h2>
          Form Errors
        </h2>
        <List>
          {items}
        </List>
      </div>
    );
  }
  return null;
};

export default FormErrors;
