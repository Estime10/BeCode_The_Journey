import markerIcon from "leaflet/dist/images/marker-icon.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Marker, useMap, Popup } from "react-leaflet";
import useGeoLocation from "../../../hooks/geoLocationHook";
import useUserDefaultLocation from "../../../hooks/userDefaultPositionHook";
import pin from "../../../assets/pinmap.png"
import { useEffect, useState } from "react";
import L from "leaflet";

export const LeafletMap1 = () => {
  const [selectedBuilding, setSelectedBuilding] = useState(null);

  const { position } = useGeoLocation();
  const { userLocation } = useUserDefaultLocation(position);
  const navigate = useNavigate();

  const map = useMap();

  useEffect(() => {
    map.setView(userLocation);
  }, [userLocation]);

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
  
  return (
    <div>
      {/* {buildings.map((building) => (
        <Marker
          key={building.id}
          position={{
            lat: building.lat,
            lng: building.lon,
            zoom: 13,
          }}
          icon={userIcon}
        >
          <Popup>
            <img src={building.initial_image}></img>
            <p>City: {building.city}</p>
            <p>Zipcode: {building.zipcode}</p>
            <p>Address: {building.adress}</p>
            <p>Type: {building.type}</p>
            <p>Date: {building.dateofpost}</p>
            <button
              onClick={() => navigate(`/building/${building.id}`)}
              className="bg-blue-800 text-white rounded-md p-1 mr-1 w-30 text-base font-medium hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-800"
            >
              Go to a Building
            </button>
          </Popup>
        </Marker>
      ))} */}
      <Marker key="1" position={userLocation} icon={userIcon2}>
        <Popup>Your location is here!</Popup>
      </Marker>
    </div>
  );
};