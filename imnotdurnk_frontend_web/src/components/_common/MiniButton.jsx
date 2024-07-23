import * as St from './MiniButton.style';

const MiniButton = ({ text, iconname, isRed = false }) => {
    return (
        <St.StyledButton $isRed={isRed}>
            <St.StyledText $isRed={isRed}>{text}</St.StyledText>
            <St.StyledIcon
                src={`src/assets/icons/Icon-${iconname}.svg`}
                alt={`${iconname} icon`}
                $isRed={isRed}
            />
        </St.StyledButton>
    );
};

export default MiniButton;
