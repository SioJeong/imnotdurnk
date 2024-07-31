import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import IconButton from '../components/_common/IconButton';
import * as St from '../components/_layout/globalStyle';
import CustomMap from '../components/map/CustomMap';
import SearchBar from '../components/map/SearchBar';
import { getReverseGeocoding } from '../services/map';
import useNavigationStore from '../stores/useNavigationStore';

const Map = () => {
    const { setNavigation } = useNavigationStore();
    const [region, setRegion] = useState(null); // 지도에 보여주는 좌표
    const [departure, setDeparture] = useState(null); // 출발지 좌표
    const [destination, setDestination] = useState(null); // 목적지 좌표
    const [departurePlaceholder, setDeparturePlaceholder] =
        useState('출발지를 입력하세요');

    useEffect(() => {
        setNavigation({
            isVisible: true,
            icon1: { iconname: 'address', isRed: false },
            title: '지도',
            icon2: { iconname: 'empty', isRed: false },
        });

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

                // 초기 위치를 region과 출발지로 설정
                setRegion({
                    latitude: 37.50127843458193,
                    longitude: 127.0396046598167,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                });

                setDeparture({
                    latitude: 37.50127843458193,
                    longitude: 127.0396046598167,
                });
            } catch (error) {
                console.error('위치 권한 요청 중 오류 발생', error);
            }
        };

        getLocationPermission();
    }, [setNavigation]);

    useEffect(() => {
        if (region) {
            // 역 지오코딩을 사용하여 주소 얻기
            const fetchAddress = async () => {
                try {
                    const address = await getReverseGeocoding(
                        region.latitude,
                        region.longitude,
                    );
                    setDeparturePlaceholder(address);
                } catch (error) {
                    console.error('주소 요청 중 오류 발생', error);
                }
            };

            fetchAddress();
        }
    }, [region]);

    // departure 또는 destination이 변경될 때 region 업데이트
    useEffect(() => {
        if (departure) {
            setRegion({
                latitude: departure.latitude,
                longitude: departure.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            });
        }
    }, [departure]);

    useEffect(() => {
        if (destination) {
            setRegion({
                latitude: destination.latitude,
                longitude: destination.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            });
        }
    }, [destination]);

    return (
        <St.Container>
            <SearchBar
                placeholder={departurePlaceholder}
                onPress={setDeparture}
            />
            <SearchBar
                placeholder="목적지를 입력하세요"
                onPress={setDestination}
            />
            <CustomMap
                region={region}
                departure={departure}
                destination={destination}
            />
            <St.FloatingButtonBottomRight>
                <IconButton
                    iconname={'location'}
                    isRed={true}
                    onPress={() => {
                        setRegion((prevRegion) => ({
                            // 역삼 멀티캠퍼스로 임시 설정
                            latitude: 37.50127843458193,
                            longitude: 127.0396046598167,
                            latitudeDelta: prevRegion?.latitudeDelta || 0.005,
                            longitudeDelta: prevRegion?.longitudeDelta || 0.005,
                        }));
                    }}
                />
            </St.FloatingButtonBottomRight>
        </St.Container>
    );
};

export default Map;
