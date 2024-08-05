import { useEffect, useRef } from 'react';
import { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { useTheme } from 'styled-components/native';
import MarkerImage from '../../assets/images/Marker.png';
import useLocationStore from '../../stores/useLocationStore';
import { MapContainer, StyledMap } from './CustomMap.style';

const CustomMap = ({ transitPolylineCoordinates, taxiPolylineCoorinates }) => {
    const { mapCenter, departure, destination } = useLocationStore();
    const mapRef = useRef(null);

    const theme = useTheme();

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
                            image={MarkerImage}
                        />
                    )}
                    {destination && (
                        <Marker
                            coordinate={destination}
                            title="목적지"
                            description="선택한 목적지"
                            image={MarkerImage}
                        />
                    )}
                    {transitPolylineCoordinates &&
                        transitPolylineCoordinates.length > 0 && (
                            <Polyline
                                coordinates={transitPolylineCoordinates}
                                strokeWidth={3}
                                strokeColor={theme.colors.red}
                            />
                        )}
                    {taxiPolylineCoorinates &&
                        taxiPolylineCoorinates.length > 0 && (
                            <Polyline
                                coordinates={taxiPolylineCoorinates}
                                strokeWidth={3}
                                strokeColor={theme.colors.green3}
                            />
                        )}
                </StyledMap>
            )}
        </MapContainer>
    );
};

export default CustomMap;
