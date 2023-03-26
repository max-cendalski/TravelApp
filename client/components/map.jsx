import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

export function MapComponent(props) {
  const containerStyle = {
    width: '',
    top: '21rem',
    height: '24rem',
    left: '2rem',
    border: '1px solid rgb(240,131,52)'
  };
  const [latLng, setLatLng] = useState({ lat: 0, lng: 0 });
  const [screenWidth, setWidth] = useState(window.innerWidth);
  useLayoutEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    if (screenWidth < 660) {
      containerStyle.width = '98%';
      containerStyle.top = '20rem';
      containerStyle.left = '1%';
      containerStyle.right = '1%';
      containerStyle.height = '20rem';
    }
    if (screenWidth > 660) {
      containerStyle.width = '38%';
    }
    return _ => {
      window.removeEventListener('resize', handleResize);
    };
  });
  useEffect(() => {
    const address = `${props.country}, ${props.city}`;
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        setLatLng({ lat: latLng.lat, lng: latLng.lng });
      });
  }, []);

  return (
    <div>
      <Map
          containerStyle={containerStyle}
          google={props.google}
          center={{
            lat: latLng.lat,
            lng: latLng.lng
          }}
          >
            <Marker
            position= {{
              lat: latLng.lat,
              lng: latLng.lng
            }}
          />
      </Map>
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: process.env.GOOGLE_MAPS_API_KEY
})(MapComponent);
