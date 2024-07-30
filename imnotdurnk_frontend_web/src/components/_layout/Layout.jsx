import { Outlet } from 'react-router-dom';
import useNavigationStore from '../../stores/useNavigationStore';
import * as St from './Layout.style';
import Navigation from './Navigation';

const Layout = () => {
    const { navigation } = useNavigationStore((state) => state);

    return (
        <>
            <Navigation />
            <St.LayoutContainer $hasNavigation={navigation.isVisible}>
                <Outlet />
            </St.LayoutContainer>
        </>
    );
};

export default Layout;
