import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';
import * as St from '../components/_layout/globalStyle';
import PathOption from '../components/map/PathOption';
import {
    fetchTaxiDirections,
    fetchTransitDirections,
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
                // 경유지 찾기
                const stopoverPositions = await getOptimalTransitStopover(
                    departure,
                    destination,
                );
                setStopover(stopoverPositions);

                if (
                    !stopoverPositions ||
                    stopoverPositions.length < 1 ||
                    stopoverPositions.length > 3
                ) {
                    setIsLoading(false);
                    return;
                }

                const newPathInfos = await Promise.all(
                    stopoverPositions.map(async (stop) => {
                        const transitInfo = await fetchTransitDirections(
                            departure,
                            stop,
                        );

                        if (!transitInfo) {
                            return null; // transitInfo가 null이면 null을 반환
                        }

                        const taxiPathInfo = await fetchTaxiDirections(
                            departure,
                            stop,
                            destination,
                        );

                        return { transitInfo, taxiPathInfo, chipdata: [] };
                    }),
                );

                const validPathInfos = newPathInfos.filter(
                    (path) => path !== null,
                );

                validPathInfos.sort(
                    (a, b) => a.taxiPathInfo.fee - b.taxiPathInfo.fee,
                );

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
                console.error('Failed to fetch directions or stopover', error);
            } finally {
                setIsLoading(false);
            }
        };

        getDirections();
    }, [departure, destination, setStopover]);

    return (
        <St.Container2>
            <St.GlobalText fontSize={'H3'} weight={'medium'}>
                {isLoading
                    ? '최적 경로를 찾는 중입니다'
                    : pathInfos.length === 0
                      ? '찾을 수 있는 경로가 없습니다'
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
