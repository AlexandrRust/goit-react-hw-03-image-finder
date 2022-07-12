import { Component } from 'react';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { AppBox } from 'App.styled';
import ImageInfo from 'components/ImageInfo/ImageInfo';
import { Modal } from 'components/Modal/Modal';
import { BtnLoadMore } from 'components/BtnLoadMore/BtnLoadMore.styled';

export class App extends Component {
  state = {
    query: '',
    page: null,
    image: {},
    showModal: false,
    status: '',
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  hendleSubmit = (query, page) => {
    this.setState({ query, page });
  };

  getImg = img => {
    this.setState({ image: img });
    this.ToggleModal();
  };
  hendlePage = () => {
    this.setState(({ page }) => ({
      page: (page += 1),
    }));
  };
  getStatus = status => {
    this.setState({ status });
  };

  render() {
    const { query, showModal, image, page, status } = this.state;
    return (
      <AppBox>
        <Searchbar onSubmit={this.hendleSubmit} />
        <ImageInfo
          imageName={query}
          page={page}
          getImg={this.getImg}
          getStatus={this.getStatus}
        />
        {query !== '' && status === 'resolved' && (
          <BtnLoadMore type="button" onClick={this.hendlePage}>
            Load More
          </BtnLoadMore>
        )}
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={image.src} alt={image.alt} />
          </Modal>
        )}
      </AppBox>
    );
  }
}
