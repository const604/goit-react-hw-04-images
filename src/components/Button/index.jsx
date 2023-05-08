import React from 'react';
import PropTypes from 'prop-types';
import { LoadMore } from './Button.styled';

const Button = ({ images, onClick }) => {
  return (
    <LoadMore type="button" images={images} onClick={() => onClick()}>
      Load more
    </LoadMore>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;
