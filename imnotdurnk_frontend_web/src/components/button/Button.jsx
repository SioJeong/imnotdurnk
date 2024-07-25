import * as St from './Button.style';

const Button = ({ text, size, isRed = false }) => {
    return (
        <St.StyledButton $size={size} $isRed={isRed}>
            {size === 'small' ? (
                <St.StyledTextP $isRed={isRed}>{text}</St.StyledTextP>
            ) : (
                <St.StyledTextH4 $isRed={isRed}>{text}</St.StyledTextH4>
            )}
        </St.StyledButton>
    );
};

export default Button;
