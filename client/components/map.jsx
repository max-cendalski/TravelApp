import React, { useState, useEffect } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

function MapComponent(props) {
  const containerStyle = {
    width: '',
    top: '21rem',
    height: '23rem',
    left: '1rem',
    border: '1px solid rgb(240,131,52)'
  };
  const [screen, setWidth] = useState({
    width: window.innerWidth
  });
  useEffect(() => {
    function handleResize() {
      setWidth({
        width: window.innerWidth
      });
    }
    window.addEventListener('resize', handleResize);
    if (screen.width < 660) {
      containerStyle.width = '95%';
    }
    if (screen.width > 660) {
      containerStyle.width = '38%';
    }
    return _ => {
      window.removeEventListener('resize', handleResize);
    };
  });

  return (
    <div>
        <Map
            containerStyle={containerStyle}
            google={props.google}
            center={{
              lat: props.lat,
              lng: props.lng
            }}
            >
              <Marker
              position= {{
                lat: props.lat,
                lng: props.lng
              }}
            />
        </Map>
      </div>
  );
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCfY6ZRvXRb8M7sKT5QM2pWZmuF6NCECEM'
})(MapComponent);
