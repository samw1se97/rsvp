import React from 'react';
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  InfoBox,
  CircleF,
  DirectionsService,
} from '@react-google-maps/api';

const libraries = ['places'];
const mapContainerStyle = {
  width: '100vw',
  height: '100vh',
};
const center = {
  lat: 32.552551174234395,
  lng: 35.33389693118151, // default longitude
};

/**
 * @summary
 * Google Maps Component
 *
 * @description
 * This component integrates Google Maps using the `@react-google-maps/api` library.
 * It displays an interactive map centered on a specific location with a custom marker
 * to highlight the event location.
 *
 * @returns {JSX.Element} The rendered Google Maps component with a marker.
 */
const MapComp = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAP_APP_API_KEY,
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  return (
    <div>
      <GoogleMap
        mapContainerStyle={{
          width: '100%',
          height: '350px',
          marginTop: '2rem',
          borderRadius: '15px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        }}
        center={center}
        zoom={14}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
          mapTypeId: 'roadmap',
        }}>
        <MarkerF
          position={center}
          title='כאן החתונה'
          icon={{
            path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
            fillColor: '#498FCC', // Red color
            fillOpacity: 1,
            strokeColor: '#1C376F',
            strokeWeight: 1,
            scale: 7, // Size of the marker
          }}
          // label='💍'
          draggable={false}
          animation={google.maps.Animation.DROP}
          onClick={() => console.log('MarkerF clicked!')}></MarkerF>
      </GoogleMap>
    </div>
  );
};

export default MapComp;
