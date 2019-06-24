import { validators } from 'formwheels';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import CheckboxField from '../fields/CheckboxField';
import RatingField from '../fields/RatingField';

const Label = styled.label`
  color: #007367;
  display: block;
  font-size: 1.3rem;
  margin: 1rem 0;
  text-align: left;
`;


const Comment = ({ accept, rating }) => (
  <div>
    <div>
      <Label>
        Terms & Conditions
      </Label>
      <CheckboxField
        id="accept"
        label="Do you accept terms and contidions"
        name="accept"
        validators={[
          validators.isRequired('Terms & Conditions must be accepted'),
        ]}
        value={accept}
      />
    </div>
    <RatingField
      label="Rating"
      id="rating"
      name="rating"
      validators={[
        validators.isRequired('Rating field is required'),
      ]}
      value={rating}
    />
  </div>
);

Comment.propTypes = {
  accept: PropTypes.bool,
  rating: PropTypes.number,
}

Comment.defaultProps = {
  accept: undefined,
  rating: undefined,
}

export default Comment;
