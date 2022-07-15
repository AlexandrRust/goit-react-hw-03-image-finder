import { Component } from 'react';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { Container } from 'components/Container/Container.styled';
import { Gallery } from 'components/Gallery/Gallery';
import { Modal } from 'components/Modal/Modal';
import { BtnLoadMore } from 'components/BtnLoadMore/BtnLoadMore.styled';
import { GetImages } from 'components/services/img-api';
import { BallTriangle } from 'react-loader-spinner';
import { BoxStatus } from 'components/BoxStatus/BoxStatus.syled';

export class App extends Component {
  state = {
    query: '',
    page: null,
    images: [],
    image: {},
    showModal: false,
    status: 'idle',
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  hendleSubmit = ({ query, page }) => {
    this.setState({ query, page });
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.query !== prevState.query ||
      this.state.page !== prevState.page
    ) {
      this.setState({ status: 'pending' });
      GetImages(
        this.state.query,
        this.state.page,
        this.setImages,
        this.hendleError
      );
    }
  }

  setImages = data => {
    if (data.total === 0) {
      this.setState({
        status: 'rejected',
      });
    } else {
      this.setState({
        images:
          this.state.page === 1
            ? [...data.hits]
            : [...this.state.images, ...data.hits],
        status: 'resolved',
      });
    }
  };

  getImg = id => {
    this.state.images.find(
      element => element.id === id && this.setState({ image: element })
    );
    this.toggleModal();
  };
  hendlePage = () => {
    this.setState(({ page }) => ({
      page: (page += 1),
    }));
  };
  hendleError = error => {
    this.setState({ status: 'rejected' });
  };

  render() {
    const { showModal, image, images, status } = this.state;

    return (
      <Container>
        <Searchbar onSubmit={this.hendleSubmit} />
        {/* <StatusGallery>{this.hendleStatus}</StatusGallery> */}
        <Gallery images={images} getItem={this.getImg} status={status} />
        {status === 'pending' ? (
          <BoxStatus>
            <BallTriangle color="#00BFFF" height={80} width={80} />
          </BoxStatus>
        ) : (
          status === 'resolved' && (
            <BtnLoadMore type="button" onClick={this.hendlePage}>
              Load More
            </BtnLoadMore>
          )
        )}
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={image.largeImageURL} alt={image.tags} />
          </Modal>
        )}
      </Container>
    );
  }
}
