import { Component } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery.styled';
import {
  ImageGalleryItem,
  ImageGalleryImg,
} from './ImageGalleryItem/ImageGalleryItem.styled';
import { BallTriangle } from 'react-loader-spinner';
import { BoxStatus } from 'components/BoxStatus/BoxStatus.syled';

export default class ImageInfo extends Component {
  state = {
    images: [],
    imageName: '',
    page: null,
    error: null,
    status: 'idle',
  };

  componentDidUpdate = (prevProps, prevState) => {
    const prevImageName = prevProps.imageName;
    const nextImageName = this.props.imageName;
    const nextPage = this.props.page;

    if (prevImageName !== nextImageName || prevProps.page !== this.props.page) {
      this.setState({ status: 'pending' });
      this.props.getStatus('pending');
      fetch(
        `https://pixabay.com/api/?key=27671423-c69978df0ba28126a1f72b97e&q=${nextImageName}&page=${nextPage}`
      )
        .then(respose => {
          if (respose.ok) {
            return respose.json();
          }
        })
        .then(images => {
          if (images.total === 0) {
            this.setState({ status: 'rejected' });
          } else {
            this.setState({
              page: nextPage,
              images:
                this.props.page === 1
                  ? [...images.hits]
                  : [...this.state.images, ...images.hits],
              status: 'resolved',
            });
            this.props.getStatus('resolved');
          }
        })
        .catch(error => {
          this.setState({ error, status: 'rejected' });
          this.props.getStatus('rejected');
        });
    }
  };
  getItem = e => {
    const item = {
      src: e.currentTarget.dataset.source,
      alt: e.currentTarget.alt,
    };
    this.props.getImg(item);
  };

  render() {
    const { images, status } = this.state;
    if (status === 'idle') {
      return <BoxStatus>Введите Имя картинки!!</BoxStatus>;
    }
    if (status === 'pending') {
      return (
        <BoxStatus>
          <BallTriangle color="#00BFFF" height={80} width={80} />
        </BoxStatus>
      );
    }
    if (status === 'rejected') {
      return <BoxStatus>Картинок с таким именем нет!!!</BoxStatus>;
    }
    if (status === 'resolved') {
      return (
        <>
          <ImageGallery className="gallery">
            {images.map(element => (
              <ImageGalleryItem className="gallery-item" key={element.id}>
                <ImageGalleryImg
                  id={element.id}
                  src={element.previewURL}
                  alt={element.tags}
                  data-source={element.largeImageURL}
                  onClick={this.getItem}
                />
              </ImageGalleryItem>
            ))}
          </ImageGallery>
        </>
      );
    }
  }
}
