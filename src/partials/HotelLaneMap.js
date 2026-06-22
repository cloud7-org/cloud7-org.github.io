import React, {useEffect, useRef} from 'react';
import keypadIcon from '../images/keypad.svg'

let mapsPromise = null;

const loadGoogleMaps = () => {
    if (window.google?.maps)
        return Promise.resolve(window.google);

    if (!mapsPromise) {
        mapsPromise = new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY}&libraries=marker&v=weekly`;
            script.async = true;
            script.onload = () => resolve(window.google);
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    return mapsPromise;
}

const keypadMarkerContent = () => {
    const img = document.createElement('img');
    img.src = keypadIcon;
    return img;
}

const HotelLaneMap = () => {
    const mapRef = useRef();

    const initMap = (google) => {
        const centerOn = new google.maps.LatLng(44.8286, -93.4594);
        const northGate = new google.maps.LatLng(44.832354, -93.462864);
        const westGate = new google.maps.LatLng(44.832801, -93.466273);
        const hotelLane = new google.maps.LatLng(44.8316, -93.4594);

        const map = new google.maps.Map(mapRef.current, {
            zoom: 15,
            center: centerOn,
            mapId: process.env.GOOGLE_MAPS_MAP_ID || 'DEMO_MAP_ID',
            fullscreenControl: true,
            zoomControl: true,
            streetViewControl: false,
            mapTypeControl: false
        });

        const {AdvancedMarkerElement} = google.maps.marker;

        new AdvancedMarkerElement({
            position: westGate,
            map,
            content: keypadMarkerContent(),
            title: "West Gate"
        });

        new AdvancedMarkerElement({
            position: northGate,
            map,
            content: keypadMarkerContent(),
            title: "North Gate"
        });

        new AdvancedMarkerElement({
            position: hotelLane,
            map,
            title: "Hotel Lane on Flying Cloud Airport"
        });
    }

    useEffect(() => {
        let cancelled = false;
        loadGoogleMaps().then((google) => {
            if (!cancelled && mapRef.current)
                initMap(google);
        });
        return () => { cancelled = true; };
    }, []);

    return <div ref={mapRef} style={{height: '600px', width: '100%'}}></div>
}

export default HotelLaneMap;
