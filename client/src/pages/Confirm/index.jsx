import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { useContext } from 'react';
import { GuestContext } from '../../context/GuestContext';
import EventDetails from '../../components/EventDetails';

/**

 * @summary
 * RSVP Confirmation Component
 * @description
 * This component allows guests to confirm their attendance to the event, select the number of guests,
 * and specify meal preferences. It uses React hooks for state management and sends RSVP updates
 * to the server via an Axios PATCH request.

 *
 * @returns {JSX.Element} The rendered confirmation form and event details
 */
function Confirm() {
  const { guest, handleGuestData } = useContext(GuestContext);
  const [formData, setFormData] = useState({
    isAttending: null,
    numberOfGuests: 1,
    mealPreference: null,
    song: '',
  });

  /**
   * @summary
   * Handles changes to form inputs and updates state.
   *
   * @description
   * This function updates the `formData` state based on user input in the form.
   * It dynamically sets the corresponding key-value pair in the state object.
   *
   * @param {React.ChangeEvent<HTMLInputElement | HTMLSelectElement>} e - The input change event.
   */
  const handleChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /**
   * @summary
   * Handles the RSVP form submission.
   * @description
   * This async function processes the `formData` state to normalize its values,
   * including converting `isAttending` to a boolean and setting the number of guests to 0
   * if the guest is not attending. It sends the processed data to the server via an Axios
   * PATCH request to update the RSVP details for the current guest. Errors are logged to
   * the console if the request fails.
   * @param {React.FormEvent<HTMLFormElement>} e - The form submission event.
   * @async
   * @throws Will log an error to the console if the server request fails.
   */
  const handleForm = async (e) => {
    console.log(guest);

    e.preventDefault();
    let fdClone = { ...formData };

    fdClone.isAttending === 'true'
      ? (fdClone.isAttending = true)
      : fdClone.isAttending === 'false'
      ? (fdClone.isAttending = false)
      : (fdClone.isAttending = null);
    if (!fdClone.isAttending) fdClone.numberOfGuests = 0;
    fdClone.numberOfGuests = fdClone.numberOfGuests * 1;

    try {
      const response = await axios.patch(
        `http://127.0.0.1:2025/rsvp/guest/${guest._id}`,
        fdClone
      );
      console.log(response);
      if (response.status === 200) {
        handleGuestData(response.data.updatedGuest);
      }
      console.log(response.data.updatedGuest);
    } catch (err) {
      console.error('error fetching guest by id: ', err);
    }
  };

  return (
    <div className={styles.confirm}>
      <h1>אישור הגעה</h1>
      <EventDetails guest={guest} />
      {guest.hasResponded && 'כבר ענית על השאלה, שינית את דעתך?'}
      <form onSubmit={handleForm}>
        <label>האם תגיע.י?</label>
        <select
          name='isAttending'
          value={formData.isAttending}
          onChange={handleChange}
          required>
          <option value=''>נא לבחור...</option>
          <option value={true}>ברור</option>
          <option value={false}>לצערי לא</option>
        </select>

        <div
          className={`${styles.expandable} ${
            !formData.isAttending || formData.isAttending === 'false'
              ? ''
              : styles.expanded
          }`}>
          <label>כמה בנוסף אליך?</label>
          <select
            name='numberOfGuests'
            value={formData.numberOfGuests}
            onChange={handleChange}
            required>
            {[...Array(10)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
          <label>מנה צמחונית?</label>
          <span>
            <input
              type='checkbox'
              id='vegetarian'
              name='mealPreference'
              value='vegetarian'
              checked={formData.mealPreference === 'vegan'}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  mealPreference: e.target.checked ? 'vegan' : '',
                })
              }
            />
            <p>כן</p>
          </span>
          <label>איזה שיר יגרום לכם לוז?</label>
          <input
            type='text'
            name='song'
            value={formData.song}
            onChange={handleChange}
          />
        </div>

        <button type='submit'>שלח</button>
      </form>
    </div>
  );
}

export default Confirm;
