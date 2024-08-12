import * as St from './Checkbox.style';

// 체크박스의 텍스트, 체크 유무 초기 값, 함수 props로 전달
const Checkbox = ({ text, checked, onChange }) => {
    return (
        <St.StyledLabel htmlFor={'checkbox'}>
            <St.StyledInput
                type="checkbox"
                id={'checkbox'}
                checked={checked}
                onChange={onChange}
            />
            <St.StyledText>{text}</St.StyledText>
        </St.StyledLabel>
    );
};

export default Checkbox;
