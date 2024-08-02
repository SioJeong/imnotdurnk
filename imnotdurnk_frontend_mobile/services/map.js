import axios from 'axios';
import { GOOGLE_PLACES_API_KEY, ODSAY_API_KEY } from 'react-native-dotenv';

// 좌표로 한글 주소 찾기
const getReverseGeocoding = async (latitude, longitude) => {
    try {
        const response = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_PLACES_API_KEY}&language=ko`,
        );
        return (
            response.data.results[0]?.formatted_address ||
            '현재 위치를 알 수 없음'
        );
    } catch (error) {
        console.error('주소 요청 중 오류 발생', error);
        throw error;
    }
};

// 대중교통 길찾기
const fetchDirections = async (departure, destination) => {
    const { latitude: depLat, longitude: depLng } = departure;
    const { latitude: destLat, longitude: destLng } = destination;

    const directionsUrl = `https://api.odsay.com/v1/api/searchPubTransPathT?SX=${depLng}&SY=${depLat}&EX=${destLng}&EY=${destLat}&apiKey=${ODSAY_API_KEY}`;

    try {
        const response = await axios.get(directionsUrl);
        if (response.status === 200) {
            const data = response.data;
            const firstPath = data.result.path[0];

            return {
                totalTime: firstPath.info.totalTime,
                pathType:
                    firstPath.pathType === 1
                        ? '지하철'
                        : firstPath.pathType === 2
                          ? '버스'
                          : '지하철 + 버스',
                busTransitCount: firstPath.info.busTransitCount,
                subwayTransitCount: firstPath.info.subwayTransitCount,
                totalWalkTime: Math.floor(firstPath.info.totalWalk / 90),
                coordinates: extractCoordinates(firstPath),
            };
        }
    } catch (error) {
        console.error('fetch 실패', error);
        throw error;
    }
};

function extractCoordinates(firstPath) {
    const coordinates = [];

    function addCoordinates(x, y) {
        if (x && y) {
            coordinates.push({
                latitude: parseFloat(y),
                longitude: parseFloat(x),
            });
        }
    }

    // path[i] 파라미터로 사용
    // path[i].subPath.passStopList.stations 배열 안을 순회하면서 x, y를 쌍으로 가져와야 함
    function addCoordinatesFromPassStopList(passStopList) {
        if (passStopList && passStopList.stations) {
            passStopList.stations.forEach((station) => {
                addCoordinates(station.x, station.y);
            });
        }
    }

    firstPath.subPath.forEach((subPath) => {
        // 지하철이나 버스 경로만 사용
        if (subPath.trafficType === 1 || subPath.trafficType === 2) {
            addCoordinatesFromPassStopList(subPath.passStopList);
        }
    });

    return coordinates;
}

export { fetchDirections, getReverseGeocoding };
