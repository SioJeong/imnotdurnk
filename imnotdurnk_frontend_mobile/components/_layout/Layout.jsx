import useNavigationStore from '../../stores/useNavigationStore';
import * as St from './globalStyle';
import Navigation from './Navigation';

const Layout = ({ children }) => {
    const { navigation } = useNavigationStore((state) => state);

    return (
        <St.AppContainer>
            <Navigation $hasNavigation={navigation.isVisible} />
            <St.LayoutContainer>{children}</St.LayoutContainer>
        </St.AppContainer>
    );
};

export default Layout;
