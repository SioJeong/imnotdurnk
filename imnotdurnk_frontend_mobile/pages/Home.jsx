import { useEffect } from 'react';
import * as St from '../components/_common/globalStyle';
import useNavigationStore from '../stores/useNavigationStore';

const Home = () => {
    const { setNavigation } = useNavigationStore();

    useEffect(() => {
        setNavigation({
            isVisible: true,
            icon1: { iconname: 'address', isRed: true },
            title: '홈 화면',
            icon2: { iconname: 'check', isRed: false },
        });
    }, [setNavigation]);

    return (
        <St.Container>
            <St.GlobalText weight="medium" fontSize="H1" color="blue">
                Home 화면 입니다.
            </St.GlobalText>
            <St.GlobalText fontSize="H3" color="green1">
                여기는 본문 텍스트입니다.
            </St.GlobalText>
        </St.Container>
    );
};

export default Home;
