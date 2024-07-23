import * as St from './IconButton.style';

const IconButton = ({ iconname }) => {
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

export default IconButton;
