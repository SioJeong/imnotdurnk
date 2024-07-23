import { Text } from 'react-native';
import styled from 'styled-components/native';

const GlobalText = styled(Text)`
    font-family: ${({ weight }) =>
        weight === 'medium' ? 'Pretendard-Medium' : 'Pretendard-Light'};
    font-size: ${({ fontSize, theme }) =>
        theme.fontSize[fontSize]
            ? `${theme.fontSize[fontSize]}px`
            : `${theme.fontSize.bodyH3}px`};
    color: ${({ color, theme }) =>
        theme.colors[color] ? theme.colors[color] : theme.colors.green3};
`;

export default GlobalText;
