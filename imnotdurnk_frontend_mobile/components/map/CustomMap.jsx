import { useEffect, useRef } from 'react';
import { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { useTheme } from 'styled-components/native';
import MarkerImage from '../../assets/images/Marker.png';
import useLocationStore from '../../stores/useLocationStore';
import IconButton from '../_common/IconButton';
import * as Map from './CustomMap.style';

const CustomMap = ({ transitPolylineCoordinates, taxiPolylineCoordinates }) => {
    const { mapCenter, departure, destination, setMapCenter } =
        useLocationStore();
    const mapRef = useRef(null);

    const theme = useTheme();

    useEffect(() => {
        if (mapRef.current && mapCenter) {
            mapRef.current.animateToRegion(mapCenter, 500);
        }
    }, [mapCenter]);

    return (
        <Map.Container>
            {mapCenter && (
                <Map.StyledMap
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
                                strokeColor={theme.colors.green3}
                            />
                        )}
                    {taxiPolylineCoordinates &&
                        taxiPolylineCoordinates.length > 0 && (
                            <Polyline
                                coordinates={taxiPolylineCoordinates}
                                strokeWidth={3}
                                strokeColor={theme.colors.red}
                            />
                        )}
                </Map.StyledMap>
            )}
            <Map.FloatingButtonBottomRight>
                <IconButton
                    iconname={'location'}
                    isRed={true}
                    onPress={() => {
                        setMapCenter({
                            latitude: 37.50127843458193,
                            longitude: 127.0396046598167,
                            latitudeDelta: 0.005,
                            longitudeDelta: 0.005,
                        });
                    }}
                />
            </Map.FloatingButtonBottomRight>
        </Map.Container>
    );
};

export default CustomMap;
