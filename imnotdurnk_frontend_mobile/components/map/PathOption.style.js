import { View } from 'react-native';
import styled from 'styled-components';

const PathOptionView = styled(View)`
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: ${({ theme, isFirstOption }) =>
        isFirstOption ? theme.colors.green2 : theme.colors.white1};

    width: 284px;
    padding: 12px 24px;
    border-radius: 10px;
`;

const ChipDataView = styled(View)`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
`;

const ChipDataWrapper = styled(View)`
    margin-right: 4px;
    background-color: ${(props) => props.backgroundColor};
    padding: 4px;
    border-radius: 45px;
`;

const InfoView = styled(View)`
    width: 100%;
`;

const InfoTitle = styled(View)`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

const Spacer = styled(View)`
    height: ${(props) => props.height}px;
`;

export {
    ChipDataView,
    ChipDataWrapper,
    InfoTitle,
    InfoView,
    PathOptionView,
    Spacer,
};
