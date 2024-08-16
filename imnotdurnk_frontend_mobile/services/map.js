import axios from 'axios';
import { api, apiNoToken } from './api';

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

// 백으로 현재 시간으로 이용 가능한 대중교통 경유지 요청
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
        const response = await apiNoToken.get('/map/odsay/route', {

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
            // 경로 데이터를 가공하여 반환
            const pathData = dataList.map((path) => {
                if (path.length === 0) return null;

                const firstStation = path[0].start;
                const lastStation = path[path.length - 1].end;
                const totalTime = path.reduce((acc, item) => acc + item.duration, 0);
                const types = path.map(item => item.type);
                const pathType = types.every(type => type === 1) 
                    ? '지하철' 
                    : types.every(type => type === 0) 
                        ? '버스' 
                        : '지하철 + 버스';

                const busTransitCount = types.filter(type => type === 0).length;
                const subwayTransitCount = types.filter(type => type === 1).length;
                const totalWalkTime = path[0].totalWalkTime;
                const summaryCoordinates = path.flatMap(item => 
                    item.routeList.map(stop => ({
                        latitude: parseFloat(stop.lat),
                        longitude: parseFloat(stop.lon),
                    }))
                );

                return {
                    firstStation,
                    lastStation,
                    totalTime,
                    pathType,
                    busTransitCount,
                    subwayTransitCount,
                    totalWalkTime,
                    summaryCoordinates,
                    transitPathInfo: path
                };
            });

            return pathData;
        } else {
            throw new Error('적절한 경유지 데이터를 받지 못했습니다.');
        }
    } catch (error) {
        console.error('최적 경유지 요청 중 오류 발생', error);
        throw new Error('최적 경유지 요청 중 오류 발생');
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
        console.error('택시 fetch 실패', error);
        throw error;
    }
};


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

// 도착 시간 업데이트
const sendArrivalTime = async () => {
    try {
        const currentTime = Date.now(); // 현재 시간 (밀리초)
        const oneDayInMilliseconds = 24 * 60 * 60 * 1000; // 하루를 밀리초로 변환
        const adjustedTime = currentTime - oneDayInMilliseconds; // 하루 전 시간
        const kstTime = new Date(adjustedTime + (9 * 60 * 60 * 1000)); // KST 시간으로 변환
        const datetimestr = kstTime.toISOString().slice(0, 16); // ISO 문자열에서 필요한 부분만 추출

        const response = await api.put(
            `/calendars/plans/${datetimestr}`,
            datetimestr,
            {},
        );

        if(response.status === 200) {
            console.log('도착 시간 저장 완료');
        }
        

    } catch (error) {
        throw new Error(error.message || '도착 시간 저장 중 오류 발생');
    }
};

export {
    fetchTaxiDirections,
    getOptimalTransitStopover,
    getReverseGeocoding,
    sendArrivalTime
};

