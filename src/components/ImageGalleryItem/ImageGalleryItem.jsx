import { useState } from 'react';
import Modal from '../Modal/Modal';
import { Item, Img } from './ImageGalleryItem.styled';
import { useContext } from 'react';
import { AppContext } from 'components/App/App';

const ImageItem = () => {
  const { images } = useContext(AppContext);
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <Item>
        <Img
          src={images.webformatURL}
          alt={images.tags}
          onClick={toggleModal}
        />
        {showModal && (
          <Modal
            largeImageURL={images.largeImageURL}
            tags={images.tags}
            onClose={toggleModal}
          />
        )}
      </Item>
    </>
  );
};



export default ImageItem;
