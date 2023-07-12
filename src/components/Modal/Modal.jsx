import { useEffect } from 'react';
import { Overlay, ModalWindow } from './Modal.styled';
import { useContext } from 'react';
import { AppContext } from 'components/App/App';

const Modal = () => {
  const { largeImageURL, tags, onClose } = useContext(AppContext);
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
  };

  return (
    <Overlay onClick={handleBackdropClick}>
      <ModalWindow>
        <img src={largeImageURL} alt={tags} />
      </ModalWindow>
    </Overlay>
  );
};



export default Modal;
