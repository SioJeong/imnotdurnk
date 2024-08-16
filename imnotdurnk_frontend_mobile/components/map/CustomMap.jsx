import { useFocusEffect } from '@react-navigation/native';
import * as Location from 'expo-location';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { useTheme } from 'styled-components/native';
import CurrentLocation from '../../assets/images/CurrentLocation.png';
import MarkerImage from '../../assets/images/Marker.png';
import useLocationStore from '../../stores/useLocationStore';
import IconButton from '../_common/IconButton';
import * as Map from './CustomMap.style';

const BACKGROUND_LOCATION_TASK = 'background-location-task';

const CustomMap = ({
    transitPolylineCoordinates,
    taxiPolylineCoordinates,
    isResult = false,
}) => {
    const {
        mapCenter,
        departure,
        destination,
        currentLocation,
        setMapCenter,
        setCurrentLocation,
    } = useLocationStore();
    const mapRef = useRef(null);
    const [foregroundSubscription, setForegroundSubscription] = useState(null);

    const theme = useTheme();

    useEffect(() => {
        const startBackgroundLocationTracking = async () => {
            try {
                await Location.startLocationUpdatesAsync(
                    BACKGROUND_LOCATION_TASK,
                    {
                        accuracy: Location.Accuracy.Balanced,
                        timeInterval: 10000,
                        foregroundService: {
                            notificationTitle: '백그라운드 위치 추적',
                            notificationBody: '위치 정보를 추적 중입니다.',
                        },
                    },
                );

            } catch (error) {
                console.error('위치 추적 설정 중 오류 발생:', error);
            }
        };

        const startForegroundLocationTracking = async () => {
            try {
                const subscription = await Location.watchPositionAsync(
                    {
                        accuracy: Location.Accuracy.High,
                        distanceInterval: 10, // 10미터 이동할 때마다 업데이트
                    },
                    (location) => {
                        const { latitude, longitude } = location.coords;
                        const coords = {
                            latitude,
                            longitude,
                            latitudeDelta: 0.005,
                            longitudeDelta: 0.005,
                        };
                        useLocationStore.getState().setCurrentLocation(coords);
                    },
                );
                setForegroundSubscription(subscription);
            } catch (error) {
                console.error('위치 추적 설정 중 오류 발생:', error);
            }
        };

        startBackgroundLocationTracking();
        startForegroundLocationTracking();

        return () => {
            Location.stopLocationUpdatesAsync(BACKGROUND_LOCATION_TASK);
            if (foregroundSubscription) {
                foregroundSubscription.remove();
            }
        };
    }, []);

    // 검색 혹은 버튼 누를 시 위치로 이동하면서 애니메이션 효과
    useEffect(() => {
        if (mapRef.current && mapCenter) {
            mapRef.current.animateToRegion(mapCenter, 500);
        }
    }, [mapCenter]);

    // 폴리라인 그려질 때 한 눈에 보여지게 시점 변경
    useFocusEffect(
        useCallback(() => {
            if (
                departure &&
                destination &&
                (transitPolylineCoordinates || taxiPolylineCoordinates)
            ) {
                const allCoordinates = [departure, destination];

                if (transitPolylineCoordinates) {
                    allCoordinates.push(...transitPolylineCoordinates);
                }
                if (taxiPolylineCoordinates) {
                    allCoordinates.push(...taxiPolylineCoordinates);
                }

                const latitudes = allCoordinates.map((coord) => coord.latitude);
                const longitudes = allCoordinates.map(
                    (coord) => coord.longitude,
                );

                const minLat = Math.min(...latitudes);
                const maxLat = Math.max(...latitudes);
                const minLon = Math.min(...longitudes);
                const maxLon = Math.max(...longitudes);

                const latitudeDelta = maxLat - minLat + 0.03;
                const longitudeDelta = maxLon - minLon + 0.03;

                setMapCenter({
                    latitude: (minLat + maxLat) / 2,
                    longitude: (minLon + maxLon) / 2,
                    latitudeDelta,
                    longitudeDelta,
                });
            }
        }, [
            departure,
            destination,
            transitPolylineCoordinates,
            taxiPolylineCoordinates,
            setMapCenter,
        ]),
    );

    // 현재 위치 버튼 눌렀을 때
    const moveCurrentLocation = () => {
        const currentPosition = {
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
        };

        setMapCenter(currentPosition);
    };

    return (
        <Map.Container>
            {mapCenter && (
                <Map.StyledMap
                    ref={mapRef}
                    provider={PROVIDER_GOOGLE}
                    initialRegion={mapCenter}
                >
                    {departure && isResult && (
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
                    {currentLocation && (
                        <Marker
                            coordinate={currentLocation}
                            title="현재 위치"
                            description="내 위치"
                            image={CurrentLocation}
                            style={{ zIndex: 1000 }}
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
                    onPress={moveCurrentLocation}
                />
            </Map.FloatingButtonBottomRight>
        </Map.Container>
    );
};

export default CustomMap;
