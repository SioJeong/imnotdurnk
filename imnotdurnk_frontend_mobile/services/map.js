import axios from 'axios';
import { apiNoToken } from './api';

// 좌표로 한글 주소 찾기
const getReverseGeocoding = async (latitude, longitude) => {
    try {
        const response = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyDushsIyoXh3N-MV2gDlhFlvPWYYbASgjg&language=ko`,
        );
        let address =
            response.data.results[0]?.formatted_address ||
            '현재 위치를 알 수 없음';

        // "대한민국" 제거
        address = address.replace(/^대한민국\s/, '');

        return address;
    } catch (error) {
        console.error('주소 요청 중 오류 발생', error);
        throw error;
    }
};

// 현재 시간으로 이용 가능한 대중교통 경유지 찾기
const getOptimalTransitStopover = async (departure, destination) => {
    const { latitude: depLat, longitude: depLng } = departure;
    const { latitude: destLat, longitude: destLng } = destination;

    // 현재 시간을 구해서 요청 파라미터로 사용
    const currentTime = new Date();
    currentTime.setMinutes(currentTime.getMinutes() + 5); // 현재 시간에 5분 더하기

    let hours = currentTime.getHours();
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');
    const seconds = currentTime.getSeconds().toString().padStart(2, '0');

    // 04:00 이전이면 24시간을 더하기
    if (hours < 4) {
        hours += 24;
    }

    // "HH:MM:SS" 형식으로 시간 변환
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes}:${seconds}`;

    try {
        console.log(depLat);
        console.log(depLng);
        console.log(destLat);
        console.log(destLng);
        console.log(formattedTime);
        console.log(typeof formattedTime);
        // 백엔드로 좌표 및 시간 정보 전송하여 최적 경유지 정보 받기
        const response = await apiNoToken.get('/map', {
            params: {
                startlat: depLat,
                startlon: depLng,
                destlat: destLat,
                destlon: destLng,
                time: formattedTime,
            },
            headers: {
                accept: 'application/json',
            },
        });

        // 서버 응답에서 데이터 추출
        const { statusCode, dataList } = response.data;

        if (statusCode === 0 && dataList && dataList.length > 0) {
            // 최대 3개의 destLat과 destLon 쌍을 추출
            const coordinates = dataList.slice(0, 3).map((item) => ({
                latitude: parseFloat(item.destLat),
                longitude: parseFloat(item.destLon),
            }));

            return coordinates;
        } else {
            throw new Error('적절한 경유지 데이터를 받지 못했습니다.');
        }
    } catch (error) {
        console.error('최적 경유지 요청 중 오류 발생', error);
        throw new Error('최적 경유지 요청 중 오류 발생');
    }
};

// 대중교통 경로 찾기
const fetchTransitDirections = async (departure, stopover) => {
    const { latitude: depLat, longitude: depLng } = departure;
    const { latitude: destLat, longitude: destLng } = stopover;

    console.log(stopover);

    const directionsUrl = `https://api.odsay.com/v1/api/searchPubTransPathT?SX=${depLng}&SY=${depLat}&EX=${destLng}&EY=${destLat}&apiKey=yPtxRPMa8thnw9UFLUnu5vholrViOMIYNolIXPJ1Pvo`;
    try {
        const response = await axios.get(directionsUrl);
        if (response.status === 200) {
            const data = response.data;

            console.log(data);

            const firstPath = data.result.path[0];

            console.log(firstPath);

            const transitPathInfo = extractTransitCoordinates(firstPath);
            const summaryCoordinates = transitPathInfo.reduce(
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
                transitPathInfo,
                summaryCoordinates,
            };

            return transitData;
        }
    } catch (error) {
        console.error('fetch 실패', error);
        return null;
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
                Authorization: `KakaoAK 5ab9885b1d3961d30c9b4d9fdfa0d10e`,
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
                Authorization: `KakaoAK 5ab9885b1d3961d30c9b4d9fdfa0d10e`,
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

// 대중교통 길찾기에서 좌표 추출
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

// 택시 경로 찾기에서 좌표 추출
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

export {
    fetchTaxiDirections,
    fetchTransitDirections,
    getOptimalTransitStopover,
    getReverseGeocoding
};

