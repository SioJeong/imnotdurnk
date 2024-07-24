import { Text } from 'react-native';
import useNavigationStore from '../../stores/useNavigationStore';
import { NavContainer } from '../_common/globalStyle';
import IconButton from './IconButton';

const Navigation = () => {
    const { navigation } = useNavigationStore((state) => state);

    return (
        <NavContainer $isVisible={navigation.isVisible}>
            {navigation.icon1 && (
                <IconButton
                    iconname={navigation.icon1.iconname}
                    isRed={navigation.icon1.isRed}
                />
            )}
            <Text>{navigation.title} 테스트중</Text>
            {navigation.icon2 && (
                <IconButton
                    iconname={navigation.icon2.iconname}
                    isRed={navigation.icon2.isRed}
                />
            )}
        </NavContainer>
    );
};

export default Navigation;
