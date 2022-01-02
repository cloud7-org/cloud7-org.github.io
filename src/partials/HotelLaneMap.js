import React, {useEffect, useRef} from 'react';
import keypadIcon from '../images/keypad.svg'

const google = window.google;

const HotelLaneMap = () => {
    const initMap = () =>{
        const centerOn = new google.maps.LatLng(44.8286, -93.4594);    
        const northGate = new google.maps.LatLng(44.832354, -93.462864);
        const westGate = new google.maps.LatLng(44.832801, -93.466273);
        const hotelLane = new google.maps.LatLng(44.8316, -93.4594);

        const map = new google.maps.Map(mapRef.current, {
            zoom: 15,
            center: centerOn,
            fullscreenControl: true,
            zoomControl: true,
            streetViewControl: false,
            mapTypeControl: false
        });

        new google.maps.Marker({
            position: westGate,
            map,
            icon: keypadIcon,
            title: "West Gate"
        });

        new google.maps.Marker({
            position: northGate,
            map,
            icon: keypadIcon,
            title: "North Gate"
        });

        new google.maps.Marker({
            position: hotelLane,
            map,
            title: "Hotel Lane on Flying Cloud Airport"
        });
    }

    const mapRef = useRef();
    useEffect(initMap);
    
    return <div ref={mapRef} style={{height: '600px', width: '100%'}}></div>    
}

export default HotelLaneMap;