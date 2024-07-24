import * as St from './MiniButton.style';

const MiniButton = ({ text, iconname, isRed = false }) => {
    return (
        <St.StyledButton $isRed={isRed}>
            <St.StyledContainer>
                <St.StyledText $isRed={isRed}>{text}</St.StyledText>
                <St.StyledIcon
                    src={`src/assets/icons/size_16/Icon-${iconname}.svg`}
                    alt={`${iconname} icon`}
                    $isRed={isRed}
                />
            </St.StyledContainer>
        </St.StyledButton>
    );
};

export default MiniButton;
