import React from 'react';

/**
 * @summary
 * Not Found Component
 *
 * @description
 * This component displays a simple 404 error message for routes that do not match any defined paths.
 * It serves as a fallback page to inform users that the requested page could not be found.
 *
 * @returns {JSX.Element} A styled message indicating a 404 error.
 */
function NotFound() {
  return (
    <div>
      <h1>404 page not found</h1>
    </div>
  );
}

export default NotFound;
