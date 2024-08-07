import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable, Text } from 'react-native';
import * as St from '../components/_layout/globalStyle';
import useLocationStore from '../stores/useLocationStore';
import useNavigationStore from '../stores/useNavigationStore';

const Home = () => {
    const { setNavigation } = useNavigationStore();
    const { resetDepartureAndDestination } = useLocationStore();
    const navi = useNavigation();

    useFocusEffect(
        React.useCallback(() => {
            setNavigation({
                isVisible: true,
                icon1: { iconname: 'address', isRed: false },
                title: '홈 화면',
                icon2: { iconname: 'empty', isRed: false },
            });

            // Home 화면으로 오면 전역의 출발지와 목적지 초기화
            resetDepartureAndDestination();
        }, [setNavigation, resetDepartureAndDestination]),
    );
    return (
        <St.Container>
            <St.GlobalText weight="medium" fontSize="H1" color="blue">
                Home 화면 입니다.
            </St.GlobalText>
            <St.GlobalText fontSize="H3" color="green1">
                여기는 본문 텍스트입니다.
            </St.GlobalText>
            <Pressable onPress={() => navi.navigate('Map')}>
                <Text>go to map</Text>
            </Pressable>
        </St.Container>
    );
};

export default Home;
