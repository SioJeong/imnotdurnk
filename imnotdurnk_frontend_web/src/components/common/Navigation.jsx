import ButtonWithIcon from './ButtonWithIcon';
import * as St from './Navigation.style';

const Navigation = ({ icon1, title, icon2 }) => {
    return (
        <St.NavContainer>
            <ButtonWithIcon iconname={icon1} />
            <h4>{title}</h4>
            <ButtonWithIcon iconname={icon2} />
        </St.NavContainer>
    );
};

export default Navigation;
