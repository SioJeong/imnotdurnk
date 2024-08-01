import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable, Text } from 'react-native';
import * as St from '../components/_layout/globalStyle';
import useNavigationStore from '../stores/useNavigationStore';

const Home = () => {
    const { setNavigation } = useNavigationStore();
    const navi = useNavigation();

    useFocusEffect(
        React.useCallback(() => {
            setNavigation({
                isVisible: true,
                icon1: { iconname: 'address', isRed: false },
                title: '홈 화면',
                icon2: { iconname: 'check', isRed: false },
            });
        }, [setNavigation]),
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
