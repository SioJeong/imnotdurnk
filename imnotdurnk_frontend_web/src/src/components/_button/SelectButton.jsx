import * as St from './SelectButton.style';

const SelectButton = ({ text, isRed = false, onClick }) => {
    return (
        <St.StyledButton $isRed={isRed} onClick={onClick}>
            <St.StyledText $isRed={isRed}>{text}</St.StyledText>
        </St.StyledButton>
    );
};

export default SelectButton;
