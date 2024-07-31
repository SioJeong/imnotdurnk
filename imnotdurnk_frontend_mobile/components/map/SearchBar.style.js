import { View } from 'react-native';
import { styled } from 'styled-components/native';

const SearchBarContainer = styled(View)`
    z-index: 1;
    height: 40px;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.white2};
    border-radius: 10px;
    padding: 10px;
    justify-content: center;
`;

export { SearchBarContainer };
