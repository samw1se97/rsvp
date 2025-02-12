import axios from 'axios';
import styles from './styles.module.css';
import React, { useEffect, useState } from 'react';
import Loader from '../../components/Loader';
import UploadForm from '../../components/UploadForm';
import ImageGallery from '../../components/ImageGallery';

function GalleryPage() {
  const [files, setFiles] = useState([]);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get(
        'http://127.0.0.1:2025/rsvp/guest/gallery'
      );
      if (response.status === 200) {
        const { images } = response.data;
        console.log(response);
        setImages(images.reverse());
      } else {
        setError(response.data.error);
      }
    } catch (err) {
      setError('Failed to fetch images');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  // if (images.length === 0) {
  //   return <p>כאן תוכלו להעלות ולראות את התמונות שלכם מהאירוע.</p>;
  // }

  if (loading) return <Loader />;

  return (
    <>
      <h1>גלריית תמונות</h1>
      {/* <Loader /> */}
      {images.length === 0 && (
        <p>כאן תוכלו להעלות ולראות את התמונות שלכם מהאירוע.</p>
      )}
      <UploadForm fetchImages={fetchImages} />
      <ImageGallery images={images} />
    </>
  );
}

export default GalleryPage;
