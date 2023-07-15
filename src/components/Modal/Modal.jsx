import { useEffect } from 'react';
import { Overlay, ModalWindow, CloseButton } from './Modal.styled';

const Modal = ({ largeImageURL, tags, onClose }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'visible';
    };
  }, [onClose]);

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
    console.log(largeImageURL);
  };

  return (
    <Overlay onClick={handleBackdropClick}>
      <ModalWindow>
        <CloseButton onClick={onClose} />
        <img src={largeImageURL} alt={tags} />
      </ModalWindow>
    </Overlay>
  );
};

export default Modal;
