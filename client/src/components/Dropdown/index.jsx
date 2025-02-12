import React, { useState } from 'react';

function Dropdown({ options, label, onChange }) {
  const [selected, setSelected] = useState('');
  const handleSelect = (e) => {
    setSelected(e.target.value);
    onChange(e.target.value);
  };

  return (
    <div>
      <label></label>
      <select name='' value={selected}>
        <option value='' disabled>
          select an option
        </option>
      </select>
    </div>
  );
}

export default Dropdown;
