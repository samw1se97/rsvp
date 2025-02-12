import React, { useState } from 'react';
import styles from './styles.module.css';
import { ImageUp } from 'lucide-react';
import axios from 'axios';

function UploadForm({ fetchImages }) {
  const [fileCount, setFileCount] = useState(0);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFileCount(e.target.files.length);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const form = e.target;
    let fd = new FormData(form);
    const validExtensions = /\.(jpg|jpeg|png|gif)$/i;
    // Filter valid files
    const filteredFiles = fd
      .getAll('guest-imgs')
      .filter((file) => validExtensions.test(file.name));

    // new FormData with only valid files
    const newFd = new FormData();
    filteredFiles.forEach((file) => newFd.append('guest-imgs', file));

    if (filteredFiles.length === 0) {
      setError('ניתן להאעלות אך ורק תמונות!');
      return;
    }
    const res = await axios
      .post('http://127.0.0.1:2025/rsvp/guest/gallery', fd, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        if (res.status === 200) {
          fetchImages();
          form.reset();
          setFileCount(0);
          setError(null);
        }
      })
      .catch((err) => {
        const { data } = err.response;
        setFileCount(0);
        setError(data.error);
      });
  };

  return (
    <form
      className={styles.upload_form}
      method='POST'
      onSubmit={handleUpload}
      encType='multipart/form-data'>
      <div className={styles.container}>
        <div className={styles.header}>
          <ImageUp size={36} />
          {fileCount > 0 && `Number of files: ${fileCount}`}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <input
            type='file'
            name='guest-imgs'
            onChange={handleFileChange}
            required
            multiple
          />
        </div>
      </div>

      <button type='submit'>Upload</button>
      {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}
    </form>
  );
}

export default UploadForm;
