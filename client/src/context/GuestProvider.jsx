import React, { useState } from 'react';
import { GuestContext } from './GuestContext';

/**
 * @summary
 * Guest Provider Component
 *
 * @description
 * This component provides guest-related state and functionality to its children components.
 * It uses React's Context API to share the `guest` state and the `handleGuestData` function
 * across the component tree, ensuring centralized and consistent data management for guest
 * information.
 *
 * @param {Object} props - The properties for this component.
 * @param {React.ReactNode} props.children - The child components that will have access to the guest context.
 *
 * @returns {JSX.Element} The GuestProvider wrapping the children components with context.
 */
function GuestProvider({ children }) {
  const [guest, setGuest] = useState({
    name: '',
    phoneNumber: '',
  });

  const handleGuestData = (data) => {
    setGuest((prev) => ({ ...prev, ...data.data }));
  };

  const contextVal = { guest, handleGuestData };

  console.log(guest);

  return (
    <>
      <GuestContext.Provider value={contextVal}>
        {children}
      </GuestContext.Provider>
    </>
  );
}

export default GuestProvider;
