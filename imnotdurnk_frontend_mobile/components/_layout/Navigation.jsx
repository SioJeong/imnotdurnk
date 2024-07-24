import useNavigationStore from '../../stores/useNavigationStore';
import IconButton from '../_common/IconButton';
import * as St from './globalStyle';

const Navigation = () => {
    const { navigation } = useNavigationStore((state) => state);

    return (
        <St.NavContainer $isVisible={navigation.isVisible}>
            {navigation.icon1 && (
                <IconButton
                    iconname={navigation.icon1.iconname}
                    isRed={navigation.icon1.isRed}
                />
            )}
            <St.GlobalText weight="medium" fontSize="H4">
                {navigation.title}
            </St.GlobalText>
            {navigation.icon2 && (
                <IconButton
                    iconname={navigation.icon2.iconname}
                    isRed={navigation.icon2.isRed}
                />
            )}
        </St.NavContainer>
    );
};

export default Navigation;
