import React from 'react';
import PropTypes from 'prop-types';
import { List } from './ImageGallery.styled';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import { useContext } from 'react';
import { AppContext } from 'components/App/App';

const ImageGallery = () => {
  const { images } = useContext(AppContext);
  return (
    <List>
      {images.map(image => (
        <ImageGalleryItem key={image.id} image={image} />
      ))}
    </List>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default ImageGallery;
