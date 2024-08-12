import AlertMessage from '@/components/_common/AlertMessage.jsx';
import { icons } from '@/shared/constants/icons';
import { useState } from 'react';
import * as St from './InputBox.style';
const InputBox = ({
    labelText, // 라벨 이름
    iconName, // 사용 아이콘 이름, 없으면 'empty'
    inputType,
    size, // 작은건 small 아님 100% 맞춰짐
    autocomplete,
    onChange,
    name, // 전달받은 입력 필드 이름
    value, // 해당 입력 필드에 입력된 값
    alertContents, // 에러메세지 내용
    readOnly,
    isProfileViewPage,
    onClickInputBox,
}) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    //const iconSrc = icons[iconName];
    const iconSrc =
        inputType === 'password'
            ? isPasswordVisible
                ? icons.visible
                : icons.invisible
            : icons[iconName] || icons.empty;
    // 가시성 설정 토글
    const handleToggleVisibility = (event) => {
        event.preventDefault();
        setIsPasswordVisible(!isPasswordVisible);
    };

    // password만 분기 적용
    const currentInputType =
        inputType === 'password' && isPasswordVisible ? 'text' : inputType;
    const handleKeyDown = (e) => {
        if (e.key === ' ') {
            // 띄어쓰기를 차단
            e.preventDefault();
        }
    };
    return (
        <St.InputBoxContainerWithAlertMessage>
            <St.InputBoxContainer
                $size={size}
                $isProfileViewPage={isProfileViewPage}
                onClick={onClickInputBox}
            >
                <St.TextContainer>
                    <St.InputLabel>{labelText}</St.InputLabel>
                    <St.Input
                        type={currentInputType}
                        autoComplete={autocomplete}
                        value={value}
                        onChange={onChange}
                        name={name}
                        readOnly={readOnly}
                        $isProfileViewPage={isProfileViewPage}
                        onKeyDown={handleKeyDown}
                    />
                </St.TextContainer>

                {inputType === 'password' ? (
                    <St.InputIcon
                        as="button" // 버튼처럼 사용
                        onClick={handleToggleVisibility}
                    >
                        <St.InputIcon
                            src={iconSrc}
                            alt={
                                isPasswordVisible
                                    ? 'Hide password'
                                    : 'Show password'
                            }
                        />
                    </St.InputIcon>
                ) : (
                    <St.InputIcon
                        src={iconSrc}
                        $isEmpty={iconSrc === 'empty'}
                    />
                )}
            </St.InputBoxContainer>
            <AlertMessage message={alertContents} size={'small'} />
        </St.InputBoxContainerWithAlertMessage>
    );
};

export default InputBox;
