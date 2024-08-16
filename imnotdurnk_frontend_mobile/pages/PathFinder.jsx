import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';
import * as St from '../components/_layout/globalStyle';
import PathOption from '../components/map/PathOption';
import {
    fetchTaxiDirections,
    getOptimalTransitStopover,
} from '../services/map';
import useLocationStore from '../stores/useLocationStore';
import useNavigationStore from '../stores/useNavigationStore';

const PathFinder = () => {
    const { setNavigation } = useNavigationStore();
    const { departure, setStopover, destination } = useLocationStore();
    const [pathInfos, setPathInfos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const theme = useTheme();

    useFocusEffect(
        React.useCallback(() => {
            setNavigation({
                isVisible: true,
                icon1: { iconname: 'backarrow', isRed: false },
                title: '길 찾기',
                icon2: { iconname: 'empty', isRed: false },
            });
        }, [setNavigation]),
    );

    useEffect(() => {
        const getDirections = async () => {
            if (!departure || !destination) {
                setIsLoading(false);
                return;
            }

            try {
                // 경유지 및 대중교통 경로 찾기
                const stopoverPaths = await getOptimalTransitStopover(
                    departure,
                    destination,
                );

                // 유효성 검사 추가
                const validStopoverPaths = stopoverPaths.filter(path => path !== null && path !== undefined);

                // 각 경유지 경로의 마지막 지점을 추출하여 setStopover에 전달
                const stopoverPoints = validStopoverPaths.map((path) => {
                    const lastStop = path.summaryCoordinates[path.summaryCoordinates.length - 1];
                    return {
                        latitude: lastStop.latitude,
                        longitude: lastStop.longitude,
                    };
                });

                setStopover(stopoverPoints);

                if (!stopoverPoints || stopoverPoints.length === 0) {
                    setIsLoading(false);
                    return;
                }

                const newPathInfos = await Promise.all(
                    validStopoverPaths.map(async (stopoverPath, index) => {
                        const taxiPathInfo = await fetchTaxiDirections(
                            departure,
                            stopoverPoints[index], // stopoverPositions을 직접 사용
                            destination,
                        );

                        // 경유지를 거치는 비용이 직행 비용보다 비쌀 경우 null 반환
                        if (taxiPathInfo.fee > taxiPathInfo.originFee) {
                            return null;
                        }

                        return {
                            transitInfo: stopoverPath,
                            taxiPathInfo,
                            chipdata: [],
                        };
                    }),
                );

                const validPathInfos = newPathInfos.filter(
                    (path) => path !== null,
                );

                validPathInfos.sort(
                    (a, b) => a.taxiPathInfo.fee - b.taxiPathInfo.fee,
                );

                // validPathInfos.forEach((path) => {
                //     if (path.taxiPathInfo.fee === validPathInfos[0].taxiPathInfo.fee) {
                //         path.chipdata.push('최저 비용');
                //     }
                // });

                if (validPathInfos.length > 0) {
                    validPathInfos[0].chipdata.push('최저 비용');
                }

                const minWalkTime = Math.min(
                    ...validPathInfos.map(
                        (path) => path.transitInfo.totalWalkTime,
                    ),
                );

                validPathInfos.forEach((path) => {
                    if (path.transitInfo.totalWalkTime === minWalkTime) {
                        path.chipdata.push('최소 도보');
                    }
                });

                const minTotalTime = Math.min(
                    ...validPathInfos.map(
                        (path) =>
                            path.transitInfo.totalTime +
                            path.taxiPathInfo.totalTime,
                    ),
                );

                validPathInfos.forEach((path) => {
                    if (
                        path.transitInfo.totalTime +
                            path.taxiPathInfo.totalTime ===
                        minTotalTime
                    ) {
                        path.chipdata.push('최단 시간');
                    }
                });

                setPathInfos(validPathInfos);
            } catch (error) {
            } finally {
                setIsLoading(false);
            }
        };

        getDirections();
    }, [departure, destination, setStopover]);

    return (
        <St.Container2>
            <St.GlobalText fontSize={'H3'} weight={'medium'} style={{ textAlign: 'center' }}>
                {isLoading
                    ? '최적 경로를 찾는 중입니다'
                    : pathInfos.length === 0
                    ? '찾을 수 있는 경로가 없습니다\n택시 탑승을 권해드립니다'
                    : '마음에 드는 옵션을 선택하세요'}
            </St.GlobalText>
            {isLoading ? (
                <ActivityIndicator size={100} color={theme.colors.red} />
            ) : (
                pathInfos.length > 0 &&
                pathInfos.map((pathInfo, index) => (
                    <PathOption key={index} pathInfo={pathInfo} index={index} />
                ))
            )}
        </St.Container2>
    );
};

export default PathFinder;
