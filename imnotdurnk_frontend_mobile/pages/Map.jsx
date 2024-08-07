import { useFocusEffect, useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import React, { useCallback, useEffect, useState } from 'react';
import Button from '../components/_common/Button';
import * as St from '../components/_layout/globalStyle';
import CustomMap from '../components/map/CustomMap';
import SearchBar from '../components/map/SearchBar';
import { getReverseGeocoding } from '../services/map';
import useLocationStore from '../stores/useLocationStore';
import useNavigationStore from '../stores/useNavigationStore';

const Map = () => {
    const { setNavigation } = useNavigationStore();
    const {
        setMapCenter,
        currentLocation,
        setCurrentLocation,
        departure,
        setDeparture,
        destination,
        setDestination,
        setStopover,
    } = useLocationStore();
    const [departurePlaceholder, setDeparturePlaceholder] =
        useState('출발지를 입력하세요');

    const navi = useNavigation();

    useFocusEffect(
        useCallback(() => {
            setNavigation({
                isVisible: true,
                icon1: { iconname: 'address', isRed: false },
                title: '지도',
                icon2: { iconname: 'empty', isRed: false },
            });
        }, [setNavigation]),
    );

    useEffect(() => {
        // 위치 정보 수집 권한 요청 및 초기 위치 설정
        const getLocationPermission = async () => {
            try {
                let { status } =
                    await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    console.log('위치 권한이 허용되지 않았습니다.');
                    return;
                }

                let location = await Location.getCurrentPositionAsync({});
                const { latitude, longitude } = location.coords;

                const initialPosition = {
                    latitude: 37.50127843458193,
                    longitude: 127.0396046598167,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                };

                // 지도의 중심, 현재 위치, 출발지를 현재 위치로 통일
                setMapCenter(initialPosition);
                setCurrentLocation(initialPosition);
                setDeparture(initialPosition);
            } catch (error) {
                console.error('위치 권한 요청 중 오류 발생', error);
            }
        };

        getLocationPermission();
    }, [setMapCenter, setCurrentLocation, setDeparture]);

    useEffect(() => {
        if (currentLocation) {
            // 역 지오코딩을 사용하여 주소 얻기
            const fetchAddress = async () => {
                try {
                    const address = await getReverseGeocoding(
                        currentLocation.latitude,
                        currentLocation.longitude,
                    );
                    setDeparturePlaceholder(address);
                } catch (error) {
                    console.error('주소 요청 중 오류 발생', error);
                }
            };

            fetchAddress();
        }
    }, [currentLocation]);

    // departure가 변경될 때 mapCenter 업데이트
    useEffect(() => {
        if (departure) {
            setMapCenter({
                latitude: departure.latitude,
                longitude: departure.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            });
        }
    }, [departure, setMapCenter]);

    // destination이 변경될 때 mapCenter 업데이트
    useEffect(() => {
        if (destination) {
            setMapCenter({
                latitude: destination.latitude,
                longitude: destination.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            });
        }
    }, [destination, setMapCenter]);

    return (
        <St.Container>
            <St.MapSearchContainer>
                <SearchBar
                    placeholder={departurePlaceholder}
                    onPress={setDeparture}
                />
                <SearchBar
                    placeholder="목적지를 입력하세요"
                    onPress={setDestination}
                />
                <Button
                    text={'경로 검색하기'}
                    color={'white1'}
                    fontSize={'H4'}
                    weight={'medium'}
                    isRed={true}
                    onPress={() => {
                        // To-do: 나중에 알고리즘 나오면 수정해야 함
                        if (destination) {
                            const tempStopoverPositions = [
                                {
                                    // 시청역
                                    latitude: 37.565355308413714,
                                    longitude: 126.97720386719465,
                                },
                                {
                                    // 잠실역
                                    latitude: 37.513812282356945,
                                    longitude: 127.10202562031904,
                                },
                                {
                                    // 도봉산역
                                    latitude: 37.689900823978476,
                                    longitude: 127.04625796639714,
                                },
                            ];
                            setStopover(tempStopoverPositions);
                            navi.navigate('PathFinder');
                        }
                    }}
                />
            </St.MapSearchContainer>

            <CustomMap />
        </St.Container>
    );
};

export default Map;
