import { ScrollView, Text, View } from 'react-native';
import { styled } from 'styled-components/native';

const AppContainer = styled(View)`
    flex: 1;
    width: 360px;
    margin: 0 auto;
`;

const LayoutContainer = styled(View)`
    flex: 1;
    width: 100%;
    margin: 0 auto;
    padding: 14px 14px 28px 14px;
`;

const NavContainer = styled(View)`
    display: ${({ $isVisible }) => ($isVisible ? 'flex' : 'none')};
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    height: 44px;

    padding: 8px 10px;
    margin: 0 auto;
`;

const Container = styled(View)`
    flex: 1;

    gap: 10px;
    background-color: ${({ theme }) => theme.colors.white1};
`;

const Container2 = styled(View)`
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    gap: 16px;
    background-color: ${({ theme }) => theme.colors.white2};

    padding: 24px;
    border-radius: 20px;
    overflow: hidden;
`;

const ScrollContainer = styled(ScrollView).attrs(() => ({
    contentContainerStyle: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
}))`
    overscrollmode: 'never';
    flex: 1;
    flex-direction: column;
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

const MapSearchContainer = styled(View)`
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;
    margin: 0 auto;
    gap: 10px;
    padding: 24px;
    background-color: ${({ theme }) => theme.colors.green2};

    border-radius: 20px;
    z-index: 1;
`;

export {
    AppContainer,
    Container,
    Container2,
    GlobalText,
    LayoutContainer,
    MapSearchContainer,
    NavContainer,
    ScrollContainer,
};
