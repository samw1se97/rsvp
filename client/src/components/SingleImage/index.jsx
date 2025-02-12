import React from 'react';
import styles from './styles.module.css';

function SingleImage({ imagePath, onClick }) {
  return (
    <img
      onClick={onClick}
      className={styles.image}
      src={`http://127.0.0.1:2025${imagePath}`}
    />
  );
}

export default SingleImage;
