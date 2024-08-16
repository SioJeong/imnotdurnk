import { GlobalText } from '../_layout/globalStyle';
import * as St from './Button.style';

const Button = ({ text, color, fontSize, weight, isRed = false, onPress }) => {
    return (
        <St.StyledButton $isRed={isRed} onPress={onPress}>
            <GlobalText color={color} fontSize={fontSize} weight={weight}>
                {text}
            </GlobalText>
        </St.StyledButton>
    );
};

export default Button;
