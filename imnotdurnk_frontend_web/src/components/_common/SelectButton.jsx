import * as St from './SelectButton.style';

const SelectButton = ({ text, isRed = false }) => {
    return (
        <St.StyledButton $isRed={isRed}>
            <St.StyledText $isRed={isRed}>{text}</St.StyledText>
        </St.StyledButton>
    );
};

export default SelectButton;
