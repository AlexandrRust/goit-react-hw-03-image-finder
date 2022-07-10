import { Component } from 'react';
import { SearchbarHeader } from './Searchbar.styled';
import { SearchForm } from 'components/SearchForm/SearchForm.styled';
import { SearchFormButton } from 'components/SearchForm/SearchFormButton/SearchFormButton';
import { SearchFormInput } from 'components/SearchForm/SearchFormInput/SearchFormInput.styled';

export class Searchbar extends Component {
  state = {
    text: '',
    page: null,
    images: [],
  };

  onChange = e => {
    this.setState({ text: e.currentTarget.value, page: 1 });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.text.toLowerCase().trim(), this.state.page);
    this.setState({ text: '' });
  };

  render() {
    const { text } = this.state;
    return (
      <SearchbarHeader className="searchbar">
        <SearchForm className="form" onSubmit={this.onSubmit}>
          <SearchFormButton type="submit" className="button" />
          <SearchFormInput
            className="input"
            value={text}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.onChange}
          />
        </SearchForm>
      </SearchbarHeader>
    );
  }
}
