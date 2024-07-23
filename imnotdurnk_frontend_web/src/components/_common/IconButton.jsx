import * as St from './IconButton.style';

const IconButton = ({ iconname, isRed = false }) => {
    return (
        <St.StyledButton $isEmpty={iconname === 'empty'} $isRed={isRed}>
            {iconname !== 'empty' && (
                <St.StyledIcon
                    src={`src/assets/icons/Icon-${iconname}.svg`}
                    alt={`${iconname} icon`}
                    $isRed={isRed}
                />
            )}
        </St.StyledButton>
    );
};

export default IconButton;
