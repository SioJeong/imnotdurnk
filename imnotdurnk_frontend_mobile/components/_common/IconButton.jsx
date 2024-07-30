import { icons } from '../../shared/constants/icons';
import * as St from './IconButton.style';

const IconButton = ({ iconname, isRed = false, onPress }) => {
    const IconComponent = icons[iconname]; // 아이콘 컴포넌트를 가져오는 부분

    return (
        <St.StyledButton
            $isEmpty={iconname === 'empty'}
            $isRed={isRed}
            disabled={iconname === 'empty'}
            onPress={onPress}
        >
            {iconname !== 'empty' && IconComponent && (
                <IconComponent width={24} height={24} />
            )}
        </St.StyledButton>
    );
};

export default IconButton;
