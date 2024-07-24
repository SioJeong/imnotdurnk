import * as St from '../components/_common/globalStyle';

const Home = () => {
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
