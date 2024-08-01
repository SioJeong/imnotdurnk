import { useNavigation } from '@react-navigation/native';
import { icons } from '../../shared/constants/icons';
import * as St from './IconButton.style';

const IconButton = ({ iconname, isRed = false, onPress }) => {
    const navi = useNavigation();
    // 아이콘 컴포넌트를 가져오는 부분
    const IconComponent = icons[iconname];

    // 아이콘이 backarrow면 뒤로가기 기능으로 설정
    const handlePress = () => {
        if (iconname === 'backarrow') {
            navi.goBack();
        } else if (onPress) {
            onPress();
        }
    };

    return (
        <St.StyledButton
            $isEmpty={iconname === 'empty'}
            $isRed={isRed}
            disabled={iconname === 'empty'}
            onPress={handlePress}
        >
            {iconname !== 'empty' && IconComponent && (
                <IconComponent width={24} height={24} />
            )}
        </St.StyledButton>
    );
};

export default IconButton;
