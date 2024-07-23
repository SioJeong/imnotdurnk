import { View } from 'react-native';
import GlobalText from '../shared/styles/GlobalText';

const Home = () => {
    return (
        <View>
            <GlobalText weight="medium" fontSize="titleH1" color="blue">
                Home 화면 입니다.
            </GlobalText>
            <GlobalText fontSize="bodyH3" color="green1">
                여기는 본문 텍스트입니다.
            </GlobalText>
        </View>
    );
};

export default Home;
