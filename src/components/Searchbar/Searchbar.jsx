import { Component } from 'react';
import { SearchbarHeader } from './Searchbar.styled';
import { SearchForm } from 'components/SearchForm/SearchForm.styled';
import { SearchFormButton } from 'components/SearchForm/SearchFormButton/SearchFormButton';
import { SearchFormInput } from 'components/SearchForm/SearchFormInput/SearchFormInput.styled';

export class Searchbar extends Component {
  render() {
    return (
      <SearchbarHeader className="searchbar">
        <SearchForm className="form">
          <SearchFormButton type="submit" className="button" />
          <SearchFormInput
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </SearchbarHeader>
    );
  }
}
