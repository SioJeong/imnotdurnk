import * as St from './InputBox.style';

const InputBox = ({labelText, iconName,inputType}) => {
    return (
        <St.InputBoxContainer >
            <St.TextContainer>
                <St.InputLabel>
                    {labelText}
                </St.InputLabel>
                <St.Input />
            </St.TextContainer>
            <St.InputIcon
                src={`src/assets/icons/Icon-${iconName}.svg`}
                alt={`${iconName} icon`}
                type = {inputType}
                $isEmpty={iconName === 'empty'}
            />
            
        </St.InputBoxContainer>
    );
};

export default InputBox;
