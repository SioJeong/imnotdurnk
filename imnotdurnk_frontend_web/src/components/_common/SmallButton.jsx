import * as St from './SmallButton.style';

const SmallButton = ({ text, isRed = false }) => {
    return (
        <St.StyledButton $isRed={isRed}>
            <St.StyledText $isRed={isRed}>{text}</St.StyledText>
        </St.StyledButton>
    );
};

export default SmallButton;
