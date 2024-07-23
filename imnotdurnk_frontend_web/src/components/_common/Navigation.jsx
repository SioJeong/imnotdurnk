import useNavigationStore from '../../stores/useNavigationStore.js';
import IconButton from './IconButton';
import * as St from './Navigation.style.js';

const Navigation = ({ isVisible, icon1, title, icon2 }) => {
    const { navigation } = useNavigationStore((state) => state);

    return (
        <St.NavContainer $isVisible={navigation.isVisible}>
            {navigation.icon1 && <IconButton iconname={navigation.icon1} />}
            <h4>{navigation.title}</h4>
            {navigation.icon2 && <IconButton iconname={navigation.icon2} />}
        </St.NavContainer>
    );
};

export default Navigation;
