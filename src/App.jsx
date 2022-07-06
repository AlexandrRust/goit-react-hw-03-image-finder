import { Component } from 'react';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { AppBox } from 'App.styled';

export class App extends Component {
  states = {};

  render() {
    return (
      <AppBox>
        <Searchbar />
      </AppBox>
    );
  }
}
