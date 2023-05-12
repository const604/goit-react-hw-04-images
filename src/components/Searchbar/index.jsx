import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  SearchBar,
  SearchForm,
  Button,
  Label,
  Input,
} from './Searchbar.styled';

export default function Searchbar({ onFormSubmit }) {
  const [imageName, setImageName] = useState('');

  const handleChange = e => {
    setImageName(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    imageName.trim() === ''
      ? alert('Enter another word to search')
      : onFormSubmit(imageName) || setImageName('');
  };

  return (
    <SearchBar>
      <SearchForm onSubmit={handleSubmit}>
        <Button type="submit">
          <Label>Search</Label>
        </Button>

        <Input
          type="text"
          autocomplete="off"
          value={imageName}
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
        />
      </SearchForm>
    </SearchBar>
  );
}

Searchbar.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};
