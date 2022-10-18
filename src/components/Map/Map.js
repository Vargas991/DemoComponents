import React, { useMemo } from 'react'
import {GoogleMap, Marker} from '@react-google-maps/api'


export function Map({positionMarker}){
    let center = useMemo(() => ({ lat: 44, lng: -80 }), [])
    return <GoogleMap
        zoom={10}
        center={center}
        mapContainerClassName="map-container"
    >
        <Marker position={positionMarker}/>
    </GoogleMap>
}
