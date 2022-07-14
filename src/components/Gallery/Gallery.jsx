import { ImageGallery } from './ImageGallery/ImageGallery.styled';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem.styled';
import { ImageGalleryImg } from './ImageGalleryImg/ImageGalleryImg.styled';

export const Gallery = ({ images, getItem }) => {
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
};
