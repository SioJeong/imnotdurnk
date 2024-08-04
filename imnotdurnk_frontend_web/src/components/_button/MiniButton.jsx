import { icons } from '@/shared/constants/icons';
import * as St from './MiniButton.style';
const MiniButton = ({ text, iconname, isRed = false, onClick }) => {
    const iconSrc = icons[iconname];
    return (
        <St.StyledButton $isRed={isRed} onClick={onClick}>
            <St.StyledContainer>
                <St.StyledText $isRed={isRed}>{text}</St.StyledText>
                <St.StyledIcon
                    src={iconSrc}
                    alt={`${iconname} icon`}
                    $isRed={isRed}
                />
            </St.StyledContainer>
        </St.StyledButton>
    );
};

export default MiniButton;
