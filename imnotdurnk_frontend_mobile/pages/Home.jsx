import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React from 'react';
import Calendar from '../assets/images/Calendar.svg';
import Chart from '../assets/images/Chart.svg';
import Game from '../assets/images/Game.svg';
import Location from '../assets/images/Location.svg';
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
                icon1: { iconname: 'empty', isRed: false },
                title: '홈',
                icon2: { iconname: 'profile', isRed: false },
            });

            // Home 화면으로 오면 전역의 출발지와 목적지 초기화
            resetDepartureAndDestination();
        }, [setNavigation, resetDepartureAndDestination]),
    );
    return (
        <St.HomeButtonContainer>
            <St.HomeButton onPress={() => navi.navigate('Test')}>
                <St.HomeButtonElement color="white2">
                    <Calendar />
                    <St.GlobalText
                        weight={'medium'}
                        fontSize="H3"
                        color="green3"
                    >
                        음주 기록 캘린더
                    </St.GlobalText>
                </St.HomeButtonElement>
            </St.HomeButton>
            <St.HomeButton>
                <St.HomeButtonElement color="red">
                    <Game />
                    <St.GlobalText
                        weight={'medium'}
                        fontSize="H3"
                        color="white1"
                    >
                        만취 판단 미니 게임
                    </St.GlobalText>
                </St.HomeButtonElement>
            </St.HomeButton>
            <St.HomeButton onPress={() => navi.navigate('Map')}>
                <St.HomeButtonElement color="white2">
                    <Location />
                    <St.GlobalText
                        weight={'medium'}
                        fontSize="H3"
                        color="green3"
                    >
                        최소 택시비 길찾기
                    </St.GlobalText>
                </St.HomeButtonElement>
            </St.HomeButton>
            <St.HomeButton>
                <St.HomeButtonElement color="green2">
                    <Chart />
                    <St.GlobalText
                        weight={'medium'}
                        fontSize="H3"
                        color="white1"
                    >
                        나의 음주 통계
                    </St.GlobalText>
                </St.HomeButtonElement>
            </St.HomeButton>
        </St.HomeButtonContainer>
    );
};

export default Home;
