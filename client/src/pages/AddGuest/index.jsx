import React, { useState } from 'react';
import styles from './styles.module.css';
import axios from 'axios';
import List from '../../components/List';
import Loader from '../../components/Loader';

/**
 * @component AddGuest
 *
 * @description
 * Provides a form to add a new guest to the system. The component manages input state for the guest's name and phone number,
 * and submits the data to the server for addition. Displays errors if the submission fails.
 *
 * @returns {JSX.Element} A form to input and submit guest details.
 *
 * @example
 * <AddGuest />
 *
 * @requires
 * - `useContext` from React for accessing the `GuestContext`.
 * - `useState` from React for managing form input state and error messages.
 * - `axios` for making HTTP requests.
 *
 * @dependencies
 * - `GuestContext`: Provides the current guest's token for authorization.
 *
 * @state
 * - `fData`: Object to manage form data with fields `name` and `phone`. Initialized to empty strings.
 * - `errMsg`: Object to store error messages from the server.
 *
 * @handlers
 * - `handleChange`: Updates form state (`fData`) dynamically as the user types into input fields.
 * - `handleSubmit`: Submits the form data to the server with authentication.
 *
 * @serverEndpoint
 * - `POST http://127.0.0.1:2025/rsvp/admin`
 *   - Headers: `Authorization: <guest.token>`
 *   - Body: `{ name, phone }`
 *
 * @errorHandling
 * - Logs errors to the console and updates the `errMsg` state if the request fails.
 *
 * @exampleOutput
 * - Clears the form fields (`name` and `phone`) on successful submission.
 * - Displays error messages from the server in the console if submission fails.
 */
function AddGuest() {
  const [fData, setFdata] = useState({ name: '', phoneNumber: '' });
  const [guestList, setGuestList] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFdata((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddToList = () => {
    if (!fData.name || !fData.phoneNumber) {
      alert('בשביל להוסיף אורח, חייב לרשום שם ומספר טלפון ☎️');
      return;
    }
    if (!/^05\d{8}$/.test(fData.phoneNumber)) {
      alert(
        ' הספר שהזנת אינו תקין ❌, אורכו של מספר חייב להיות לפחות 🔟 ספרות וחייב להתחיל ב - 0️⃣5️⃣'
      );
      setFdata((prev) => ({ ...prev, phoneNumber: '' }));
      return;
    }

    setGuestList((prev) => [...prev, fData]);
    setFdata({ name: '', phoneNumber: '' });
  };

  const handleDeleteFromList = (index) => {
    setGuestList((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://127.0.0.1:2025/rsvp/admin`,
        guestList
      );
      console.log(res);

      // if (!res) return <Loader />;

      if (res.status === 201) {
        setFdata({ name: '', phoneNumber: '' });
        setGuestList([]);
      }
    } catch (error) {
      console.error(
        'error adding new guest:',
        error.response?.data || error.message.data
      );
      let { status } = error.response;
      console.error(error.response.data);
      if (status === 409) {
        alert(error.response?.data.message);
        setGuestList([]);
      }
    }
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type='text'
          name='name'
          value={fData.name}
          placeholder='שם'
          onChange={handleChange}
        />
        <input
          type='text'
          name='phoneNumber'
          value={fData.phoneNumber}
          placeholder='מס טלפון'
          onChange={handleChange}
        />
        <img src='/branch.webp' alt='branch' className='branch_pic' />
        <button type='button' onClick={handleAddToList}>
          add
        </button>
        <button type='submit' disabled={guestList.length === 0}>
          submit
        </button>
      </form>
      {guestList.length > 0 && (
        <List list={guestList} onChange={handleDeleteFromList} />
      )}
    </>
  );
}

export default AddGuest;
