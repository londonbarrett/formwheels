import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const List = styled.ul`
  list-style-position: inside;
  margin-top: .5rem;
  padding-left: 1rem;
  text-align: left;
`;

const ListItem = styled.li`
  font-size: .7rem;
`;

const FieldErrors = ({ errors }) => {
  if (errors.map) {
    const items = errors.map(error => (
      <ListItem key={error}>
        {error}
      </ListItem>
    ));
    return (
      <List>
        {items}
      </List>
    );
  }
  return null;
};

FieldErrors.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.string),
};

FieldErrors.defaultProps = {
  errors: [],
};

export default FieldErrors;
