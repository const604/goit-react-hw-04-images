import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Overlay, ModalImg } from './Modal.styled';

export default function Modal({ largeImageURL, onClose }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  },[]);

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return (
    <Overlay onClick={handleBackdropClick}>
      <ModalImg>
        <img src={largeImageURL} alt="" />
      </ModalImg>
    </Overlay>
  );
}


Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
