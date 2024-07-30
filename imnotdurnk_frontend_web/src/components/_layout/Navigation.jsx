import IconButton from '@/components/_button/IconButton.jsx';
import useNavigationStore from '../../stores/useNavigationStore.js';
import * as St from './Navigation.style.js';

const Navigation = ({ isVisible, icon1, title, icon2 }) => {
    const { navigation } = useNavigationStore((state) => state);

    return (
        <St.NavContainer $isVisible={navigation.isVisible}>
            {navigation.icon1 && (
                <IconButton
                    iconname={navigation.icon1.iconname}
                    isRed={navigation.icon1.isRed}
                    onClick={navigation.icon1.onClick}
                />
            )}
            <h4>{navigation.title}</h4>
            {navigation.icon2 && (
                <IconButton
                    iconname={navigation.icon2.iconname}
                    isRed={navigation.icon2.isRed}
                    onClick={navigation.icon2.onClick}
                />
            )}
        </St.NavContainer>
    );
};

export default Navigation;
