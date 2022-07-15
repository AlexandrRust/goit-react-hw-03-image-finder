import { ImageGallery } from './ImageGallery/ImageGallery.styled';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem.styled';
import { ImageGalleryImg } from './ImageGalleryImg/ImageGalleryImg.styled';
import { BoxStatus } from 'components/BoxStatus/BoxStatus.syled';

export const Gallery = ({ images, getItem, status }) => {
  if (status === 'idle') {
    return <BoxStatus>Введите Имя картинки!!</BoxStatus>;
  } else if (status === 'rejected') {
    return <BoxStatus>Картинок с таким именем нет!!!</BoxStatus>;
  } else if (status === 'resolved') {
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
                onClick={() => getItem(element.id)}
              />
            </ImageGalleryItem>
          ))}
        </ImageGallery>
      </>
    );
  }
};
