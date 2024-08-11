import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React from 'react';
import MapFinish from '../assets/images/MapFinish.svg';
import Button from '../components/_common/Button';
import * as St from '../components/_layout/globalStyle';
import useNavigationStore from '../stores/useNavigationStore';

const PathFinal = () => {
    const { setNavigation } = useNavigationStore();
    const navi = useNavigation();

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
                    목적지 근처에 도착했어요{'\n'}도착 시간은 자동으로
                    저장했으니{'\n'}걱정하지 마세요!
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
