import { useEffect, useRef } from 'react';
import { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import useLocationStore from '../../stores/useLocationStore';
import { MapContainer, StyledMap } from './CustomMap.style';

const CustomMap = ({ polylineCoordinates }) => {
    const { mapCenter, departure, destination } = useLocationStore();
    const mapRef = useRef(null);

    useEffect(() => {
        if (mapRef.current && mapCenter) {
            mapRef.current.animateToRegion(mapCenter, 500);
        }
    }, [mapCenter]);

    return (
        <MapContainer>
            {mapCenter && (
                <StyledMap
                    ref={mapRef}
                    provider={PROVIDER_GOOGLE}
                    initialRegion={mapCenter}
                >
                    {departure && (
                        <Marker
                            coordinate={departure}
                            title="출발지"
                            description="현재 위치"
                        />
                    )}
                    {destination && (
                        <Marker
                            coordinate={destination}
                            title="목적지"
                            description="선택한 목적지"
                        />
                    )}
                    {polylineCoordinates && polylineCoordinates.length > 0 && (
                        <Polyline
                            coordinates={polylineCoordinates}
                            strokeWidth={3}
                            strokeColor="black"
                        />
                    )}
                </StyledMap>
            )}
        </MapContainer>
    );
};

export default CustomMap;
