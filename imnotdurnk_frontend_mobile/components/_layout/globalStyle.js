import { ScrollView, Text, View } from 'react-native';
import { styled } from 'styled-components/native';

const AppContainer = styled(View)`
    flex: 1;
`;

const LayoutContainer = styled(View)`
    flex: 1;
    width: 100%;
    max-width: 720px;
    margin: 0 auto;
    padding: 14px 14px 28px 14px;
`;

const NavContainer = styled(View)`
    display: ${({ $isVisible }) => ($isVisible ? 'flex' : 'none')};
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    max-width: 720px;
    width: 100%;
    height: 44px;

    padding: 8px 10px;
    margin: 0 auto;
`;

const Container = styled(ScrollView)`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.white1};
    /* TODO: 확인용 border - 추후 제거 */
    border: 1px solid black;
`;

const GlobalText = styled(Text)`
    font-family: ${({ weight }) =>
        weight === 'medium' ? 'Pretendard-Medium' : 'Pretendard-Light'};
    font-size: ${({ fontSize, theme }) =>
        theme.fontSize[fontSize]
            ? `${theme.fontSize[fontSize]}px`
            : `${theme.fontSize.H3}px`};
    color: ${({ color, theme }) =>
        theme.colors[color] ? theme.colors[color] : theme.colors.green3};
`;

export { AppContainer, Container, GlobalText, LayoutContainer, NavContainer };
