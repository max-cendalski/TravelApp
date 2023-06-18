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

    if (screenWidth <= 660) {
      containerStyle.width = '95%';
      containerStyle.top = '20rem';
      containerStyle.left = '0';
      containerStyle.right = '0';
      containerStyle.height = '20rem';
    } else if (screenWidth > 660 && screenWidth <= 1024) {
      containerStyle.width = '96%';
      containerStyle.left = '0';
      containerStyle.right = '0';
      containerStyle.top = '23rem';
      containerStyle.height = '19rem';
    } else if (screenWidth > 1024 && screenWidth <= 1920) {
      containerStyle.width = '38%';
    } else {
      containerStyle.width = '47rem';
    }

    return _ => {
      window.removeEventListener('resize', handleResize);
    };
  });

  // useLayoutEffect(() => {
  //   function handleResize() {
  //     setWidth(window.innerWidth);
  //   }
  //   window.addEventListener('resize', handleResize);
  //   if (screenWidth < 660) {
  //     containerStyle.width = '95%';
  //     containerStyle.top = '20rem';
  //     containerStyle.left = '0';
  //     containerStyle.right = '0';
  //     containerStyle.height = '20rem';
  //   }
  //   if (screenWidth > 660) {
  //     containerStyle.width = '38%';
  //   }
  //   return _ => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // });
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
          position={{
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
