import { useEffect, useState } from 'react';
import IconButton from '../components/_common/IconButton';
import * as St from '../components/_layout/globalStyle';
import CustomMap from '../components/map/CustomMap';
import { fetchDirections } from '../services/map';
import useLocationStore from '../stores/useLocationStore';
import useNavigationStore from '../stores/useNavigationStore';

const PathFinder = () => {
    const { setNavigation } = useNavigationStore();
    const { setMapCenter, departure, destination } = useLocationStore();
    const [transitInfo, setTransitInfo] = useState({
        totalTime: 0,
        pathType: '',
        busTransitCount: 0,
        subwayTransitCount: 0,
        totalWalkTime: 0,
        coordinates: [],
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

        const getDirections = async () => {
            try {
                const transitData = await fetchDirections(
                    departure,
                    destination,
                );
                setTransitInfo(transitData);
            } catch (error) {
                console.error('Failed to fetch directions', error);
            }
        };

        getDirections();
    }, [departure, destination]);

    return (
        <St.Container>
            <St.GlobalText>
                총 소요시간 : {transitInfo.totalTime}분
            </St.GlobalText>
            <St.GlobalText>탑승 유형 : {transitInfo.pathType}</St.GlobalText>
            <St.GlobalText>
                탑승 횟수 :
                {transitInfo.busTransitCount > 0
                    ? '버스' + transitInfo.busTransitCount + '회'
                    : null}{' '}
                {transitInfo.subwayTransitCount > 0
                    ? '지하철 ' + transitInfo.subwayTransitCount + '회'
                    : null}
            </St.GlobalText>
            <St.GlobalText>
                총 도보 시간 : {transitInfo.totalWalkTime}분
            </St.GlobalText>
            <CustomMap polylineCoordinates={transitInfo.coordinates} />

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
