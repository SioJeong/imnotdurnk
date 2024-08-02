import { useEffect, useState } from 'react';
import IconButton from '../components/_common/IconButton';
import * as St from '../components/_layout/globalStyle';
import CustomMap from '../components/map/CustomMap';
import { fetchTaxiDirections } from '../services/map';
import useLocationStore from '../stores/useLocationStore';
import useNavigationStore from '../stores/useNavigationStore';

const Taxi = () => {
    const { setNavigation } = useNavigationStore();
    const { setMapCenter, departure, destination } = useLocationStore();
    const [taxiPathInfo, setTaxiPathInfo] = useState({
        fee: 0,
        totalTime: 0,
        totalDistance: 0,
        coordinates: [],
    });

    useEffect(() => {
        if (!departure || !destination) {
            return;
        }

        setNavigation({
            isVisible: true,
            icon1: { iconname: 'backarrow', isRed: false },
            title: '택시 경로 찾기',
            icon2: { iconname: 'empty', isRed: false },
        });

        const getDirections = async () => {
            try {
                const taxiData = await fetchTaxiDirections(
                    departure,
                    destination,
                );
                setTaxiPathInfo(taxiData);
            } catch (error) {
                console.error('Failed to fetch taxi directions', error);
            }
        };

        getDirections();
    }, [departure, destination]);

    return (
        <St.Container>
            <St.GlobalText>총 이용 요금 {taxiPathInfo.fee}원</St.GlobalText>
            <St.GlobalText>
                총 이동 시간 {taxiPathInfo.totalTime}분
            </St.GlobalText>
            <St.GlobalText>
                총 이동 거리 {taxiPathInfo.totalDistance}km
            </St.GlobalText>
            <CustomMap polylineCoordinates={taxiPathInfo.coordinates} />

            <St.FloatingButtonBottomRight>
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
            </St.FloatingButtonBottomRight>
        </St.Container>
    );
};

export default Taxi;
