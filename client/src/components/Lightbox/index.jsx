import React, { useEffect } from 'react';
import styles from './styles.module.css';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

function Lightbox({ images, currentIndex, onClose, onNext, onPrev }) {
  useEffect(() => {
    // Disable scrolling when lightbox is open
    document.body.classList.add('no-scroll');

    return () => {
      // Re-enable scrolling when lightbox closes
      document.body.classList.remove('no-scroll');
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrev]);
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.lightbox} onClick={(e) => e.stopPropagation()}>
        <img
          className={styles.image}
          src={`http://127.0.0.1:2025${images[currentIndex]}`}
          alt='Expanded View'
        />
        <button className={styles.close} onClick={onClose}>
          <X size={24} />
        </button>
        <button className={styles.prev} onClick={onPrev}>
          <ChevronLeft />
        </button>
        <button className={styles.next} onClick={onNext}>
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}

export default Lightbox;
