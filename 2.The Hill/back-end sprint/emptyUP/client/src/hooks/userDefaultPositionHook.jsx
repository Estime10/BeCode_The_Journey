import { useEffect, useState } from 'react';

function useUserDefaultLocation(postion) {
    const [userLocation, setUserLocation] = useState({ lat: postion?.latitude ?? -70.9, lng: postion?.longitude ?? 42.35, zoom: 13 });

    useEffect(() => {
        if (postion) {
            setUserLocation({ lat: postion.latitude, lng: postion.longitude, zoom: 13 })
        }
    }, [postion]);
    
    return {
        userLocation,
    };
}

export default useUserDefaultLocation;