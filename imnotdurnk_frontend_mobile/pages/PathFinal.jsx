import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import MapFinish from '../assets/images/MapFinish.svg';
import Button from '../components/_common/Button';
import * as St from '../components/_layout/globalStyle';
import { api } from '../services/api';
import { checkLoginStatus } from '../services/user';
import useNavigationStore from '../stores/useNavigationStore';

const PathFinal = () => {
    const { setNavigation } = useNavigationStore();
    const navi = useNavigation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const sendArrivalTime = async () => {
        try {
            const currentTime = Date.now(); // 현재 시간 (밀리초)
            const oneDayInMilliseconds = 24 * 60 * 60 * 1000; // 하루를 밀리초로 변환
            const adjustedTime = currentTime - oneDayInMilliseconds; // 하루 전 시간
            const kstTime = new Date(adjustedTime + (9 * 60 * 60 * 1000)); // KST 시간으로 변환
    
            const datetimestr = kstTime.toISOString().slice(0, 16); // ISO 문자열에서 필요한 부분만 추출
    
            await api.put(`/calendars/arrival/${datetimestr}`);
        } catch (error) {
            console.error('도착 시간 전송 중 오류 발생:', error);
        }
    };

    useEffect(() => {
        const checkLogin = async () => {
            const status = await checkLoginStatus();

            setIsLoggedIn(status);

            if (status) {
                sendArrivalTime();
            }
        };
        checkLogin();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            setNavigation({
                isVisible: true,
                icon1: { iconname: 'empty', isRed: false },
                title: '안내 종료',
                icon2: { iconname: 'empty', isRed: false },
            });
        }, [setNavigation]),
    );

    return (
        <St.Container>
            <MapFinish style={{ marginTop: 40, marginBottom: 60 }} />
            <St.Container2>
                <St.GlobalText weight={'medium'}>
                    목적지 근처에 도착했어요
                    {isLoggedIn && (
                        <>{'\n'}도착 시간은 자동으로 저장했으니{'\n'}걱정하지 마세요!</>
                    )}
                </St.GlobalText>
                <Button
                    text={'홈으로'}
                    color={'white1'}
                    fontSize={'H4'}
                    weight={'medium'}
                    isRed={true}
                    onPress={() => {
                        navi.navigate('Home');
                    }}
                />
            </St.Container2>
        </St.Container>
    );
};

export default PathFinal;
