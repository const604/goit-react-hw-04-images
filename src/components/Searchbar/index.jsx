import { Component } from 'react';
import PropTypes from 'prop-types';
import {
  SearchBar,
  SearchForm,
  Button,
  Label,
  Input,
} from './Searchbar.styled';

class Searchbar extends Component {
  state = { imageName: '' };

  handleChange = e => {
    this.setState({ imageName: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.state.imageName.trim() === ''
      ? alert('Enter another word to search')
      : this.props.onFormSubmit(this.state.imageName) || this.reset();
  };

  reset = () => {
    this.setState({ imageName: '' });
  };

  render() {
    return (
      <SearchBar>
        <SearchForm onSubmit={this.handleSubmit}>
          <Button type="submit">
            <Label>Search</Label>
          </Button>

          <Input
            type="text"
            autocomplete="off"
            value={this.state.imageName}
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
          />
        </SearchForm>
      </SearchBar>
    );
  }
}

Searchbar.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
