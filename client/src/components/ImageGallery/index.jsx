import React, { useState } from 'react';
import styles from './styles.module.css';
import SingleImage from '../SingleImage';
import Lightbox from '../Lightbox';

function ImageGallery({ images }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeLightbox = () => setIsOpen(false);

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevImage = () =>
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <>
      <div className={styles.image_grid}>
        {images.slice().map((imagePath, index) => (
          <SingleImage
            onClick={() => openLightbox(index)}
            key={index}
            imagePath={imagePath}
          />
        ))}
      </div>

      {isOpen && (
        <Lightbox
          images={images}
          currentIndex={currentIndex}
          onClose={closeLightbox}
          onNext={nextImage}
          onPrev={prevImage}
        />
      )}
    </>
  );
}

export default ImageGallery;
