import useNavigationStore from '../../stores/useNavigationStore.js';
import IconButton from '../_common/IconButton.jsx';
import * as St from './Navigation.style.js';

const Navigation = ({ isVisible, icon1, title, icon2 }) => {
    const { navigation } = useNavigationStore((state) => state);

    return (
        <St.NavContainer $isVisible={navigation.isVisible}>
            {navigation.icon1 && (
                <IconButton
                    iconname={navigation.icon1.iconname}
                    isRed={navigation.icon1.isRed}
                />
            )}
            <h4>{navigation.title}</h4>
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
