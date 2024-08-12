import { icons } from '@/shared/constants/icons';
import * as St from './IconButton.style';

const IconButton = ({ iconname, isRed = false, onClick }) => {
    const iconSrc = icons[iconname]; // 아이콘 정적 import
    return (
        <St.StyledButton
            $isEmpty={iconname === 'empty'}
            $isRed={isRed}
            disabled={iconname === 'empty'}
            onClick={onClick}
        >
            {iconname !== 'empty' && iconSrc && (
                <St.StyledIcon
                    src={iconSrc}
                    alt={`${iconname} icon`}
                    $isRed={isRed}
                />
            )}
        </St.StyledButton>
    );
};

export default IconButton;
