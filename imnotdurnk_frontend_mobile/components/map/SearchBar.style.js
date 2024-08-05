import { View } from 'react-native';
import { styled } from 'styled-components/native';

const SearchBarContainer = styled(View)`
    width: 100%;
    height: 42px;

    position: 'absolute';
    /* To-do 검색 결과가 지도 아래로 숨겨짐. 해결해야함 */

    z-index: 9999;
    elevation: 9999;

    background-color: ${({ theme }) => theme.colors.white1};
    padding: 10px;

    border-radius: 10px;
`;

export { SearchBarContainer };
