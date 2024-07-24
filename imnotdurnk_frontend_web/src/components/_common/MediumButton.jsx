import * as St from './MediumButton.style';

const MediumButton = ({ text, isRed = false }) => {
    return (
        <St.StyledButton $isRed={isRed}>
            <St.StyledText $isRed={isRed}>{text}</St.StyledText>
        </St.StyledButton>
    );
};

export default MediumButton;
