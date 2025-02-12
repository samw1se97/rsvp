import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';

/**
 * @summary
 * Menu Page Component
 *
 * @description
 * This component fetches and displays the wedding menu. The menu is retrieved from a server
 * endpoint using an API call. The data includes categories (e.g., appetizers, main courses)
 * and their respective dishes, each with a name and summary. It dynamically renders each
 * menu category and its contents.
 *
 * @returns {JSX.Element} The rendered menu page with a list of menu categories and dishes.
 */
function Menu() {
  const [data, setData] = useState({});

  useEffect(() => {
    const getMenu = async () => {
      try {
        const result = await axios.get('http://127.0.0.1:2025/rsvp/guest/menu');
        // console.log(result.data);
        setData((prev) => ({ ...prev, ...result.data.menuData }));
      } catch (err) {
        console.error(err);
      }
    };

    getMenu();
    // console.log(data.menuData);
  }, []);

  return (
    <>
      <h1>Menu</h1>
      <div className={styles.foodSection}>
        {data?.menuData &&
          data.menuData.map((el, i) => (
            <div className={styles.single_dish} key={i + 1}>
              <h2 className={styles.title}>{el.title}</h2>
              {el.content.map((cnt) => (
                <>
                  <b>{cnt.name} - </b> <p>{cnt.summary}</p>{' '}
                </>
              ))}
            </div>
          ))}
      </div>
    </>
  );
}

export default Menu;
