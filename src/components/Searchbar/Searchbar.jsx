import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import {
  SearchForm,
  SearchInput,
  SearchButton,
  SearchSpan,
  SearchLogo,
} from './Searchbar.styled';

const Searchbar = ({ onSubmit }) => {
  const [inputValue, setinputValue] = useState('');

  const handleChange = e => {
    setinputValue(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log('Submitting search:', inputValue);
    onSubmit(inputValue);
    setinputValue('');
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

export default Searchbar;
