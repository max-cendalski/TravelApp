import React from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { useState } from 'react/cjs/react.production.min';

function MapComponent(props) {
  const containerStyle = {
    width: this.state.containerWidth,
    top: '21rem',
    height: '23rem',
    left: '1rem',
    border: '1px solid rgb(240,131,52)'
  };
  return (
    <article>
          <Map
            id="map-trip-details"
            containerStyle={containerStyle}
            google={this.props.google}
            center={{
              lat: this.props.mapCenter.lat,
              lng: this.props.mapCenter.lng
            }}
            >
            <Marker
            position= {{
              lat: this.props.mapCenter.lat,
              lng: this.props.mapCenter.lng
            }}
            />
        </Map>
         </article>
  );
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCfY6ZRvXRb8M7sKT5QM2pWZmuF6NCECEM'
})(MapComponent);
