import IconButton from './IconButton';
import * as St from './Navigation.style';

const Navigation = ({ icon1, title, icon2 }) => {
    return (
        <St.NavContainer>
            <IconButton iconname={icon1} />
            <h4>{title}</h4>
            <IconButton iconname={icon2} />
        </St.NavContainer>
    );
};

export default Navigation;
