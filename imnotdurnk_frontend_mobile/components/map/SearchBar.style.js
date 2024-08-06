import { View } from 'react-native';
import { styled } from 'styled-components/native';

const SearchBarContainer = styled(View)`
    width: 100%;
    height: 42px;

    z-index: 3;
    elevation: 3;

    background-color: ${({ theme }) => theme.colors.white1};
    padding: 10px;

    border-radius: 10px;
`;

export { SearchBarContainer };
