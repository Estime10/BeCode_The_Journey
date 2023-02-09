import markerIcon from "leaflet/dist/images/marker-icon.png"
import useGeoLocation from "../../hooks/geoLocationHook";
import useUserDefaultLocation from "../../hooks/userDefaultPositionHook";
import pin from "../../assets/pinmap.png"
import { Marker, useMap } from 'react-leaflet';
import { useEffect } from 'react';
import L from 'leaflet';

export const LeafletMap = ({coordinates, children}) => {
    const { position } = useGeoLocation();
    const { userLocation } = useUserDefaultLocation(position);
  
    const map = useMap();
       
    useEffect(() => {
        map.setView(coordinates);
    }, [coordinates]);

    const userIcon = L.icon({
        iconUrl: markerIcon,
        iconSize: [22, 38],
        iconAnchor: [11, 19],
    });

    const userIcon2 = L.icon({
        iconUrl: pin,
        iconSize: [60, 60],
        iconAnchor: [15, 25],
      });
    
    
    return <div>
        <Marker position={coordinates} icon={userIcon}>
            {children}
        </Marker>
        <Marker position={userLocation} icon={userIcon2}>
            {children}
        </Marker>
    </div>;
}

