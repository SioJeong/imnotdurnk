import * as St from './ButtonWithIcon.style';

const ButtonWithIcon = ({ iconname }) => {
    return (
        <St.StyledButton $isEmpty={iconname === 'empty'}>
            {iconname !== 'empty' && (
                <img
                    src={`src/assets/icons/Icon-${iconname}.svg`}
                    alt={`${iconname} icon`}
                />
            )}
        </St.StyledButton>
    );
};

export default ButtonWithIcon;
