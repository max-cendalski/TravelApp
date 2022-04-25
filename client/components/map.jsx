import React from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

import { useLayoutEffect } from 'react/cjs/react.production.min';

function MapComponent(props) {

  const containerStyle = {
    width: props.width,
    top: '21rem',
    height: '23rem',
    left: '1rem',
    border: '1px solid rgb(240,131,52)'
  };

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
