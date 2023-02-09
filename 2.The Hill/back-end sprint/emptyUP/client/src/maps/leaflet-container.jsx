// import './leaflet-container.css';
import { MapContainer, TileLayer } from 'react-leaflet';
import useGeoLocation from '../hooks/geoLocationHook';
import useUserDefaultLocation from '../hooks/userDefaultPositionHook';

export const LeafletContainer = ({ children }) => { 
    const { position } = useGeoLocation();
    const { userLocation } = useUserDefaultLocation(position);
    
    return <MapContainer className="h-full w-full z-0 leaflet-container relative" zoom={userLocation.zoom} center={userLocation}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
       {children}
    </MapContainer>;
}
