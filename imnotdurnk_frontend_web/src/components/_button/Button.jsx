import * as St from './Button.style';

const Button = ({ text, size, isRed = false, onClick }) => {
    return (
        <St.StyledButton $size={size} $isRed={isRed} onClick={onClick}>
            {size === 'small' ? (
                <St.StyledTextP $isRed={isRed}>{text}</St.StyledTextP>
            ) : (
                <St.StyledTextH4 $isRed={isRed}>{text}</St.StyledTextH4>
            )}
        </St.StyledButton>
    );
};

export default Button;
