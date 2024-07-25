import { useState } from 'react';
import * as St from './InputBox.style';

const InputBox = ({ labelText, iconName, inputType, size, autocomplete }) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    // 가시성 설정 토글
    const handleToggleVisibility = (event) => {
        event.preventDefault();
        setIsPasswordVisible(!isPasswordVisible);
    };

    // password만 분기 적용
    const currentInputType =
        inputType === 'password' && isPasswordVisible ? 'text' : inputType;

    return (
        <St.InputBoxContainer $size={size}>
            <St.TextContainer>
                <St.InputLabel>{labelText}</St.InputLabel>
                <St.Input type={currentInputType} autoComplete={autocomplete} />
            </St.TextContainer>

            {inputType === 'password' ? (
                <St.InputIcon
                    as="button" // 버튼처럼 사용
                    onClick={handleToggleVisibility}
                >
                    <img
                        src={`src/assets/icons/size_24/Icon-${isPasswordVisible ? 'visible' : 'invisible'}.svg`}
                        alt={
                            isPasswordVisible
                                ? 'Hide password'
                                : 'Show password'
                        }
                    />
                </St.InputIcon>
            ) : (
                <St.InputIcon
                    src={`src/assets/icons/size_24/Icon-${iconName}.svg`}
                    alt={`${iconName} icon`}
                    $isEmpty={iconName === 'empty'}
                />
            )}
        </St.InputBoxContainer>
    );
};

export default InputBox;
