import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import * as St from '../components/_layout/globalStyle';
import CustomMap from '../components/map/CustomMap';
import PathDescription from '../components/map/PathDescription';
import useLocationStore from '../stores/useLocationStore';
import useNavigationStore from '../stores/useNavigationStore';

const PathDetail = ({ route }) => {
    const { setNavigation } = useNavigationStore();
    const { currentLocation, destination } = useLocationStore();
    const { pathInfo } = route.params;
    const { transitInfo, taxiPathInfo } = pathInfo;

    const navi = useNavigation();
    const proximityThreshold = 0.001; // 오차 범위 설정 (예: 0.001도 약 100m)

    useFocusEffect(
        React.useCallback(() => {
            setNavigation({
                isVisible: true,
                icon1: { iconname: 'backarrow', isRed: false },
                title: '경로 안내',
                icon2: { iconname: 'x', isRed: false },
            });
        }, [setNavigation]),
    );

    useEffect(() => {
        const checkProximity = () => {
            const distance = Math.sqrt(
                Math.pow(currentLocation.latitude - destination.latitude, 2) +
                    Math.pow(
                        currentLocation.longitude - destination.longitude,
                        2,
                    ),
            );

            if (distance <= proximityThreshold) {
                // 목적지에 근접했을 때 'PathFinal'로 이동하고 스택 초기화
                navi.reset({
                    index: 0,
                    routes: [{ name: 'PathFinal' }],
                });
            }
        };

        checkProximity();
    }, [currentLocation, destination, navi]);

    return (
        <St.ScrollContainer>
            <View style={{ Height: 300, width: '100%' }}>
                <CustomMap
                    transitPolylineCoordinates={transitInfo.summaryCoordinates}
                    taxiPolylineCoordinates={taxiPathInfo.taxiCoordinates}
                    isResult={true}
                />
            </View>
            <PathDescription pathInfo={pathInfo} />
        </St.ScrollContainer>
    );
};

export default PathDetail;
