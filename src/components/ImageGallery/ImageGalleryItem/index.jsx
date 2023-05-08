import React from 'react';
import PropTypes from 'prop-types';
import { GalleryItem, Image } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ webformatURL, largeImageURL, showModal }) => {
  return (
    <GalleryItem>
      <Image
        src={webformatURL}
        alt=""
        onClick={() => showModal(largeImageURL)}
      />
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    }).isRequired
  ),
  showModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
