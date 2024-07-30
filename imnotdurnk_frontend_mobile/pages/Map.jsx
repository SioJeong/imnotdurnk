import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import useNavigationStore from '../stores/useNavigationStore';
import SearchBar from '../components/map/SearchBar';
import CustomMap from '../components/map/CustomMap';
import * as St from '../components/_layout/globalStyle';

const Map = () => {
    const { setNavigation } = useNavigationStore();
    const [region, setRegion] = useState(null);
    const [currentAddress, setCurrentAddress] = useState('');

    useEffect(() => {
        setNavigation({
            isVisible: true,
            icon1: { iconname: 'address', isRed: false },
            title: '지도',
            icon2: { iconname: 'empty', isRed: false },
        });

        // 위치 정보 수집 권한 받기
        const getLocationPermission = async () => {
            try {
                let { status } =
                    await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    console.log('Location permission not granted');
                    return;
                }

                let location = await Location.getCurrentPositionAsync({});
                const { latitude, longitude } = location.coords;

                setRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                });
            } catch (error) {
                console.error('Error getting location permission', error);
            }
        };

        getLocationPermission();
    }, [setNavigation]);

    return (
        <St.Container>
            <SearchBar
                setRegion={setRegion}
                setCurrentAddress={setCurrentAddress}
            />
            <CustomMap region={region} />
        </St.Container>
    );
};

export default Map;
