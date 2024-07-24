import * as St from './Checkbox.style';

const Checkbox = ({ text }) => {
    return (
        <St.StyledLabel htmlFor={'checkbox'}>
            <St.StyledInput type="checkbox" id={'checkbox'} />
            <St.StyledText>{text}</St.StyledText>
        </St.StyledLabel>
    );
};

export default Checkbox;
