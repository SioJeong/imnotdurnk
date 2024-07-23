import { View } from 'react-native';
import * as St from './Home.style';

const Home = () => {
    return (
        <View>
            <St.TitleText weight="medium">Home 화면 입니다.</St.TitleText>
            <St.BodyText>여기는 본문 텍스트입니다.</St.BodyText>
        </View>
    );
};

export default Home;
