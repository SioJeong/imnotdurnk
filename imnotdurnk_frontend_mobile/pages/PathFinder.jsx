import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';
import * as St from '../components/_layout/globalStyle';
import PathOption from '../components/map/PathOption';
import { fetchTaxiDirections, fetchTransitDirections } from '../services/map';
import useLocationStore from '../stores/useLocationStore';
import useNavigationStore from '../stores/useNavigationStore';

const PathFinder = () => {
    const { setNavigation } = useNavigationStore();
    const { departure, stopover, destination } = useLocationStore();
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
            if (
                !departure ||
                !destination ||
                !stopover ||
                stopover.length < 1 ||
                stopover.length > 3
            ) {
                setIsLoading(false);
                return;
            }

            try {
                const newPathInfos = await Promise.all(
                    stopover.map(async (stop) => {
                        const transitInfo = await fetchTransitDirections(
                            departure,
                            stop,
                        );
                        const taxiPathInfo = await fetchTaxiDirections(
                            departure,
                            stop,
                            destination,
                        );
                        return { transitInfo, taxiPathInfo, chipdata: [] };
                    }),
                );

                newPathInfos.sort(
                    (a, b) => a.taxiPathInfo.fee - b.taxiPathInfo.fee,
                );
                if (newPathInfos.length > 0) {
                    newPathInfos[0].chipdata.push('최저 비용');
                }

                const minWalkTime = Math.min(
                    ...newPathInfos.map(
                        (path) => path.transitInfo.totalWalkTime,
                    ),
                );

                newPathInfos.forEach((path) => {
                    if (path.transitInfo.totalWalkTime === minWalkTime) {
                        path.chipdata.push('최소 도보');
                    }
                });

                const minTotalTime = Math.min(
                    ...newPathInfos.map(
                        (path) =>
                            path.transitInfo.totalTime +
                            path.taxiPathInfo.totalTime,
                    ),
                );
                newPathInfos.forEach((path) => {
                    if (
                        path.transitInfo.totalTime +
                            path.taxiPathInfo.totalTime ===
                        minTotalTime
                    ) {
                        path.chipdata.push('최단 시간');
                    }
                });

                setPathInfos(newPathInfos);
            } catch (error) {
                console.error('Failed to fetch directions', error);
            } finally {
                // 데이터 로드 완료 시 로딩 중지
                setIsLoading(false);
            }
        };

        getDirections();
    }, [departure, destination, stopover]);

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
