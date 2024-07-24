import * as St from './LargeButton.style';

const LargeButton = ({ text, isRed = false }) => {
    return (
        <St.StyledButton $isRed={isRed}>
            <St.StyledText $isRed={isRed}>{text}</St.StyledText>
        </St.StyledButton>
    );
};

export default LargeButton;
