import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import PropTypes from 'prop-types';
import {
  SearchForm,
  SearchInput,
  SearchButton,
  SearchSpan,
  SearchLogo,
} from './Searchbar.styled';
import { useContext } from 'react';
import { AppContext } from 'components/App/App';

const Searchbar = () => {
  const { onSubmit } = useContext(AppContext);
  const [inputValue, setinputValue] = useState('');

  const handleChange = e => {
    setinputValue(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const searchQuery = e.target.elements.searchName.value.trim();
    onSubmit(searchQuery);
    e.target.reset();
  };

  return (
    <header>
      <SearchForm onSubmit={handleSubmit}>
        <a href="https://pixabay.com/" target="_blank" rel="noreferrer">
          <SearchLogo
            src={require('./pixabay-logo.png')}
            alt="logo"
            width="200"
          />
        </a>
        <SearchButton>
          <BsSearch />
          <SearchSpan>Search</SearchSpan>
        </SearchButton>
        <SearchInput
          name="searchName"
          type="text"
          id="search"
          value={inputValue}
          onChange={handleChange}
        />
      </SearchForm>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
