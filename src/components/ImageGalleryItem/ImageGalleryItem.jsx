import { useState } from 'react';
import PropTypes from 'prop-types';
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

ImageItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
};

export default ImageItem;
