import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import MapFinish from '../assets/images/MapFinish.svg';
import Button from '../components/_common/Button';
import * as St from '../components/_layout/globalStyle';
import { sendArrivalTime } from '../services/map';
import { checkLoginStatus } from '../services/user';
import useNavigationStore from '../stores/useNavigationStore';

const PathFinal = () => {
    const { setNavigation } = useNavigationStore();
    const navi = useNavigation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkLogin = async () => {
            const status = await checkLoginStatus();
            setIsLoggedIn(status);

            if (status) {
                await sendArrivalTime();
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
            <St.Container2 style={{justifyContent: 'center'}}>
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
