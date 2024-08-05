import React, { useEffect, useState } from 'react';
import * as St from '../components/_layout/globalStyle';
import PathOption from '../components/map/PathOption';
import { fetchTaxiDirections, fetchTransitDirections } from '../services/map';
import useLocationStore from '../stores/useLocationStore';
import useNavigationStore from '../stores/useNavigationStore';

const PathFinder = () => {
    const { setNavigation } = useNavigationStore();
    const { departure, stopover, destination } = useLocationStore();
    const [pathInfos, setPathInfos] = useState([]);

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
    }, [departure, destination, setNavigation]);

    useEffect(() => {
        const getDirections = async () => {
            if (
                !departure ||
                !destination ||
                !stopover ||
                stopover.length < 1 ||
                stopover.length > 3
            ) {
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

                // 택시비 가장 적은 곳에 최저 비용 chipdata 추가
                newPathInfos.sort(
                    (a, b) => a.taxiPathInfo.fee - b.taxiPathInfo.fee,
                );
                if (newPathInfos.length > 0) {
                    newPathInfos[0].chipdata.push('최저 비용');
                }

                // 대중교통 도보 시간 가장 적은 곳에 최소 도보 chipdata 추가
                const minWalkTime = Math.min(
                    ...newPathInfos.map(
                        (path) => path.transitInfo.totalWalkTime,
                    ),
                );

                // 대중교통 탑승 시간 + 택시 탑승 시간 가장 적은 곳에 최단 시간 chipdata 추가
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
            }
        };

        getDirections();
    }, [departure, destination, stopover]);

    return (
        <St.Container2>
            <St.GlobalText fontSize={'H3'} weight={'medium'}>
                마음에 드는 옵션을 선택하세요
            </St.GlobalText>
            {pathInfos.map((pathInfo, index) => (
                <PathOption key={index} pathInfo={pathInfo} index={index} />
            ))}
        </St.Container2>
    );
};

export default PathFinder;
