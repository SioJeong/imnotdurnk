import { Text } from 'react-native';
import styled from 'styled-components/native';

const GlobalText = styled(Text)`
    font-family: ${({ weight }) =>
        weight === 'medium' ? 'Pretendard-Medium' : 'Pretendard-Light'};
`;

export default GlobalText;
