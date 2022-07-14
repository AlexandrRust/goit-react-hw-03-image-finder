import { Component } from 'react';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { Container } from 'components/Container/Container.styled';
import { Gallery } from 'components/Gallery/Gallery';
import { Modal } from 'components/Modal/Modal';
import { BoxStatus } from 'components/BoxStatus/BoxStatus.syled';
import { BallTriangle } from 'react-loader-spinner';
import { BtnLoadMore } from 'components/BtnLoadMore/BtnLoadMore.styled';

export class App extends Component {
  state = {
    query: 'aaa',
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
      fetch(
        `https://pixabay.com/api/?key=27671423-c69978df0ba28126a1f72b97e&q=${this.state.query}&page=${this.state.page}`
      )
        .then(respose => {
          if (respose.ok) {
            return respose.json();
          }
        })
        .then(images => {
          if (images.totalHits === 0) {
            this.setState({ status: 'rejected' });
          } else {
            this.setState({
              images:
                this.state.page === 1
                  ? [...images.hits]
                  : [...this.state.images, ...images.hits],
              status: 'resolved',
            });
          }
        })
        .catch(error => {
          this.setState({ error, status: 'rejected' });
        });
    }
  }

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

  render() {
    const { query, showModal, images, image, status } = this.state;
    let boxStatus;
    if (status === 'idle') {
      boxStatus = 'Введите Имя картинки!!';
    } else if (status === 'pending') {
      boxStatus = <BallTriangle color="#00BFFF" height={80} width={80} />;
    } else if (status === 'rejected') {
      boxStatus = 'Картинок с таким именем нет!!!';
    } else if (status === 'resolved') {
      boxStatus = <Gallery images={images} getItem={this.getImg} />;
    }
    return (
      <Container>
        <Searchbar onSubmit={this.hendleSubmit} />
        <BoxStatus>{boxStatus}</BoxStatus>
        {/* <Gallery images={images} getItem={this.getImg} /> */}
        {query !== '' && status === 'resolved' && (
          <BtnLoadMore type="button" onClick={this.hendlePage}>
            Load More
          </BtnLoadMore>
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
