import { useEffect, useState } from 'react';
import IconButton from '../components/_common/IconButton';
import * as St from '../components/_layout/globalStyle';
import CustomMap from '../components/map/CustomMap';
import { fetchTaxiDirections, fetchTransitDirections } from '../services/map';
import useLocationStore from '../stores/useLocationStore';
import useNavigationStore from '../stores/useNavigationStore';

const PathFinder = () => {
    const { setNavigation } = useNavigationStore();
    const { setMapCenter, setStopover, departure, stopover, destination } =
        useLocationStore();
    const [transitInfo, setTransitInfo] = useState({
        firstStation: '',
        lastStation: '',
        totalTime: 0,
        pathType: '',
        busTransitCount: 0,
        subwayTransitCount: 0,
        totalWalkTime: 0,
        transitCoordinates: [],
        summaryCoordinates: [],
    });
    const [taxiPathInfo, setTaxiPathInfo] = useState({
        fee: 0,
        totalTime: 0,
        totalDistance: 0,
        taxiCoordinates: [],
    });

    useEffect(() => {
        if (!departure || !destination) {
            return;
        }

        setNavigation({
            isVisible: true,
            icon1: { iconname: 'backarrow', isRed: false },
            title: '길 찾기',
            icon2: { iconname: 'empty', isRed: false },
        });

        const tempStopoverPosition = {
            latitude: 37.565355308413714,
            longitude: 126.97720386719465,
        };

        // setStopover를 먼저 호출
        setStopover(tempStopoverPosition);
    }, [departure, destination, setNavigation, setStopover]);

    useEffect(() => {
        const getDirections = async () => {
            if (!departure || !destination || !stopover) {
                return;
            }

            try {
                const transitData = await fetchTransitDirections(
                    departure,
                    stopover,
                );
                setTransitInfo(transitData);

                const taxiData = await fetchTaxiDirections(
                    stopover,
                    destination,
                );
                setTaxiPathInfo(taxiData);
            } catch (error) {
                console.error('Failed to fetch directions', error);
            }
        };

        getDirections();
    }, [departure, destination, stopover]); // stopover 상태가 변경될 때 getDirections 호출

    return (
        <St.Container>
            <St.GlobalText>
                {transitInfo.lastStation}까지 대중교통{' '}
                {transitInfo.busTransitCount + transitInfo.subwayTransitCount}회
                이용 후 택시 탑승
            </St.GlobalText>
            <St.GlobalText>
                총 소요시간 : {transitInfo.totalTime + taxiPathInfo.totalTime}분
            </St.GlobalText>
            <St.GlobalText>
                총 도보 시간 : {transitInfo.totalWalkTime}분
            </St.GlobalText>
            <St.GlobalText>총 이용 요금 {taxiPathInfo.fee}원</St.GlobalText>

            {transitInfo.transitCoordinates.map((route, index) => (
                <St.GlobalText key={index}>
                    {route.trafficType === 1 || route.trafficType === 2
                        ? `${route.name} (${route.startName} - ${route.endName}) 총 ${route.stationCount} 정거장 총 ${route.sectionTime}분 소요`
                        : `도보 (${route.startName} - ${route.endName}) 총 ${route.sectionTime}분 소요`}
                </St.GlobalText>
            ))}

            <CustomMap
                transitPolylineCoordinates={transitInfo.summaryCoordinates}
                taxiPolylineCoorinates={taxiPathInfo.taxiCoordinates}
            />

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

export default PathFinder;
