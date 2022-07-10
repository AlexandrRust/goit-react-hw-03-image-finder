import { Component } from 'react';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { AppBox } from 'App.styled';
import ImageInfo from 'components/ImageInfo/ImageIngo';
import { ModalImg } from 'components/Modal/Modal';
import { BtnLodeMore } from 'components/BtnLodeMore/BtnLodeMore.styled';

export class App extends Component {
  state = {
    text: '',
    page: null,
    image: {},
    showModal: false,
    status: '',
  };

  ToggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  HendleSubmit = (text, page) => {
    this.setState({ text, page });
  };

  getImg = img => {
    this.setState({ image: img });
    this.ToggleModal();
  };
  HendlePage = () => {
    this.setState(({ page }) => ({
      page: (page += 1),
    }));
  };
  getStatus = status => {
    this.setState({ status });
  };

  render() {
    const { text, showModal, image, page, status } = this.state;
    return (
      <AppBox>
        <Searchbar onSubmit={this.HendleSubmit} />
        <ImageInfo
          imageName={text}
          page={page}
          getImg={this.getImg}
          getStatus={this.getStatus}
        />
        {text !== '' && status === 'resolved' && (
          <BtnLodeMore type="button" onClick={this.HendlePage}>
            Lode More
          </BtnLodeMore>
        )}
        {showModal && (
          <ModalImg onClose={this.ToggleModal}>
            <img src={image.src} alt={image.alt} />
          </ModalImg>
        )}
      </AppBox>
    );
  }
}
