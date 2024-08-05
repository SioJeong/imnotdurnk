import axios from 'axios';
import {
    GOOGLE_PLACES_API_KEY,
    KAKAO_API_KEY,
    NEW_ODSAY_KEY,
} from 'react-native-dotenv';

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

// 대중교통 경로 찾기
const fetchTransitDirections = async (departure, stopover) => {
    const { latitude: depLat, longitude: depLng } = departure;
    const { latitude: destLat, longitude: destLng } = stopover;

    const directionsUrl = `https://api.odsay.com/v1/api/searchPubTransPathT?SX=${depLng}&SY=${depLat}&EX=${destLng}&EY=${destLat}&apiKey=${NEW_ODSAY_KEY}`;

    try {
        const response = await axios.get(directionsUrl);
        if (response.status === 200) {
            const data = response.data;

            const firstPath = data.result.path[0];

            const transitCoordinates = extractTransitCoordinates(firstPath);
            const summaryCoordinates = transitCoordinates.reduce(
                (acc, route) => acc.concat(route.coordinates),
                [],
            );

            const transitData = {
                firstStation: firstPath.info.firstStartStation,
                lastStation: firstPath.info.lastEndStation,
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
                transitCoordinates: extractTransitCoordinates(firstPath),
                transitCoordinates,
                summaryCoordinates,
            };

            return transitData;
        }
    } catch (error) {
        console.error('fetch 실패', error);
        throw error;
    }
};

// 택시 경로 찾기
const fetchTaxiDirections = async (departure, stopover, destination) => {
    const { latitude: depLat, longitude: depLng } = departure;
    const { latitude: stopLat, longitude: stopLng } = stopover;
    const { latitude: destLat, longitude: destLng } = destination;

    const originDirectionsUrl = `https://apis-navi.kakaomobility.com/v1/directions?origin=${depLng},${depLat}&destination=${destLng},${destLat}`;
    const directionsUrl = `https://apis-navi.kakaomobility.com/v1/directions?origin=${stopLng},${stopLat}&destination=${destLng},${destLat}`;

    try {
        // 원래 출발지에서 목적지까지의 택시비
        const originResponse = await axios.get(originDirectionsUrl, {
            headers: {
                Authorization: `KakaoAK ${KAKAO_API_KEY}`,
            },
        });
        let originFare = 0;
        if (originResponse.status === 200) {
            const originData = originResponse.data;
            const originRoute = originData.routes[0];
            originFare =
                originRoute.summary.fare.taxi + originRoute.summary.fare.toll;
        }

        // 알고리즘으로 도출된 최적 경유지부터 목적지까지의 택시비
        const response = await axios.get(directionsUrl, {
            headers: {
                Authorization: `KakaoAK ${KAKAO_API_KEY}`,
            },
        });
        if (response.status === 200) {
            const data = response.data;
            // 추천 경로 하나만 사용
            const route = data.routes[0];

            return {
                originFee: originFare,
                fee: route.summary.fare.taxi + route.summary.fare.toll,
                totalTime: Math.floor(route.summary.duration / 60),
                totalDistance:
                    Math.round((route.summary.distance / 1000) * 10) / 10,
                taxiCoordinates: extractTaxiCoordinates(data),
            };
        }
    } catch (error) {
        console.error('fetch 실패', error);
        throw error;
    }
};

function extractTransitCoordinates(firstPath) {
    const routes = [];

    firstPath.subPath.forEach((subPath, index) => {
        if (subPath.trafficType === 1 || subPath.trafficType === 2) {
            const newRoute = {
                trafficType: subPath.trafficType,
                name:
                    subPath.lane && subPath.lane[0]
                        ? subPath.lane[0].name || subPath.lane[0].busNo
                        : 'Unknown',
                stationCount: subPath.stationCount,
                sectionTime: subPath.sectionTime,
                startName: subPath.startName,
                endName: subPath.endName,
                coordinates: [],
            };

            if (subPath.passStopList && subPath.passStopList.stations) {
                subPath.passStopList.stations.forEach((station) => {
                    if (station.x && station.y) {
                        newRoute.coordinates.push({
                            latitude: parseFloat(station.y),
                            longitude: parseFloat(station.x),
                        });
                    }
                });
            }

            routes.push(newRoute);
        } else if (subPath.trafficType === 3) {
        }
    });

    return routes;
}

const extractTaxiCoordinates = (response) => {
    const taxiCoordinates = [];

    const route = response.routes[0]; // 첫 번째 route만 사용

    route.sections.forEach((section) => {
        section.roads.forEach((road) => {
            for (let i = 0; i < road.vertexes.length; i += 2) {
                taxiCoordinates.push({
                    latitude: road.vertexes[i + 1],
                    longitude: road.vertexes[i],
                });
            }
        });
    });

    return taxiCoordinates;
};

export { fetchTaxiDirections, fetchTransitDirections, getReverseGeocoding };
