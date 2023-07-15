import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as API from '../../services/PixabayApi';
import Loader from 'components/Loader/Loader';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from '../Button/Button';
import { EmptyAlert } from './App.styled';
import { useState, useEffect, useCallback, createContext } from 'react';

export const AppContext = createContext();

const App = () => {
  const [searchName, setSearchName] = useState('');
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  const addImages = useCallback(async () => {
    try {
      console.log('Calling addImages...');
      setIsLoading(true);
      const data = await API.getImages(searchName, currentPage);
      console.log('Response:', data);

      if (data.hits.length === 0) {
        return toast.info('Sorry image not found...', {
          position: toast.POSITION.TOP_RIGHT,
        });
      }

      const normalizedImage = API.normalizedImages(data.hits);
      console.log('Normalized Images:', normalizedImage);

      setImages(prevImages => {
        const updatedImages = [...prevImages, ...normalizedImage];
        console.log('Updated Images:', updatedImages);
        return updatedImages;
      });

      setIsLoading(false);
      setTotalPages(Math.ceil(data.totalHits / 12));
      console.log('Total Pages:', totalPages);
    } catch (error) {
      setError('Something went wrong!');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [searchName, currentPage, totalPages]);

  const handleSubmit = useCallback(
    async query => {
      setSearchName(query);
      setImages([]);
      setCurrentPage(1);

      // Wywołanie addImages dla currentPage równego 1
      await addImages();
    },
    [addImages]
  );

  const loadMore = useCallback(() => {
    setCurrentPage(prevPage => prevPage + 1);
  }, []);

  useEffect(() => {
    console.log('Calling useEffect...');
    console.log('searchName:', searchName);
    console.log('currentPage:', currentPage);
    if (searchName !== '' && currentPage !== 1) {
      console.log('Calling addImages...');
      addImages();
    }
  }, [searchName, currentPage, addImages]);

  return (
    <AppContext.Provider
      value={{
        searchName,
        setSearchName,
        images,
        setImages,
        currentPage,
        setCurrentPage,
        setError,
        isLoading,
        setIsLoading,
        totalPages,
        setTotalPages,
        addImages,
        loadMore,
        handleSubmit,
      }}
    >
      <div>
        <ToastContainer transition={Slide} />
        <Searchbar onSubmit={handleSubmit} />
        {images.length > 0 ? (
          <ImageGallery />
        ) : (
          <EmptyAlert>Image gallery is empty... 📷</EmptyAlert>
        )}
        {isLoading && <Loader />}
        {images.length > 0 && totalPages !== currentPage && !isLoading && (
          <Button onClick={loadMore} />
        )}
      </div>
    </AppContext.Provider>
  );
};

export default App;
