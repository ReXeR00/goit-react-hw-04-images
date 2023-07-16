import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as API from '../../services/PixabayApi';
import Loader from 'components/Loader/Loader';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from '../Button/Button';
import { EmptyAlert } from './App.styled';
import { useState, useEffect } from 'react';

const App = () => {
  const [searchName, setSearchName] = useState('');
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (searchName === '') {
      return;
    }

    const addImages = async () => {
      try {
        setIsLoading(true);
        const data = await API.getImages(searchName, currentPage);

        if (data.hits.length === 0) {
          return toast.info('Sorry image not found...', {
            position: toast.POSITION.TOP_RIGHT,
          });
        }

        const normalizedImage = API.normalizedImages(data.hits);

        setImages(prevImages => {
          const updatedImages = [...prevImages, ...normalizedImage];
          return updatedImages;
        });

        setIsLoading(false);
        setTotalPages(Math.ceil(data.totalHits / 12));
      } catch (error) {
        setError('Something went wrong!');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    addImages();
  }, [searchName, currentPage]);

  const handleSubmit = async query => {
    setSearchName(query);
    setCurrentPage(1);
    setImages([]);
  };

  const loadMore = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  return (
    <div>
      <ToastContainer transition={Slide} />
      <Searchbar onSubmit={handleSubmit} />
      {images.length > 0 ? (
        <ImageGallery images={images} />
      ) : (
        <EmptyAlert>Image gallery is empty... 📷</EmptyAlert>
      )}
      {isLoading && <Loader />}
      {images.length > 0 && totalPages !== currentPage && !isLoading && (
        <Button onClick={loadMore} />
      )}
    </div>
  );
};

export default App;
