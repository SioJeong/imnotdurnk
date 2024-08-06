import { useNavigation } from '@react-navigation/native';
import useNavigationStore from '../../stores/useNavigationStore';
import IconButton from '../_common/IconButton';
import * as St from './globalStyle';

// 네비게이션의 아이콘 별 Path 경로 (상수처리)
const onPressPath = { address: 'Home', x: 'Home' };

const Navigation = () => {
    const { navigation } = useNavigationStore((state) => state);
    const navi = useNavigation();

    return (
        <St.NavContainer $isVisible={navigation.isVisible}>
            {navigation.icon1 && (
                <IconButton
                    iconname={navigation.icon1.iconname}
                    isRed={navigation.icon1.isRed}
                    onPress={() =>
                        navi.navigate(onPressPath[navigation.icon1.iconname])
                    }
                />
            )}
            <St.GlobalText weight="medium" fontSize="H4">
                {navigation.title}
            </St.GlobalText>
            {navigation.icon2 && (
                <IconButton
                    iconname={navigation.icon2.iconname}
                    isRed={navigation.icon2.isRed}
                    onPress={() =>
                        navi.navigate(onPressPath[navigation.icon2.iconname])
                    }
                />
            )}
        </St.NavContainer>
    );
};

export default Navigation;
