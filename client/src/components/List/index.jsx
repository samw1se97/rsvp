import React from 'react';
import styles from './styles.module.css';
import splitCamelCase from '../../utils/splitCamelCase';

function List({ list, onChange }) {
  const columns = Object.keys(list[0]);
  // console.log(columns);

  return (
    <div className={styles.table_container}>
      <table className={styles.guest_table}>
        <thead>
          <tr>
            <th>#</th>
            {columns.map((col, index) => (
              <th key={index}>{splitCamelCase(col)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {list.length > 0 ? (
            list.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td>{rowIndex + 1}</td>
                {columns.map((col, colIndex) => (
                  <td key={colIndex}>{row[col]}</td>
                ))}
              </tr>
            ))
          ) : (
            <tr className={styles.no_guests}>
              <td colSpan='4' className='no-guests'>
                No guests added yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default List;
