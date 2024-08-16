import { Text, View } from 'react-native';
import styled from 'styled-components/native';

const GraphContainer = styled(View)`
    width: 100%;
    margin: 0;
`;

const BarContainer = styled(View)`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

const BarSegment = styled(View)`
    height: 1px;
    background-color: ${({ theme }) => theme.colors.green3};
    position: relative;
`;

const Circle = styled(View)`
    width: 8px;
    height: 8px;
    background-color: ${({ color }) => color};
    border-radius: 4px;
    position: absolute;
    top: -3px;
    z-index: 2;
`;

const SegmentText = styled(Text)`
    font-family: 'Pretendard-Medium';
    font-size: ${({ theme }) => `${theme.fontSize.H6}px`};
    text-align: center;
    margin-top: 5px;
    flex: 1;
    color: ${({ color }) => color};
`;

const CircleWrapper = styled(View)`
    position: absolute;
    align-items: center;
    z-index: 2;
`;

const LastStationText = styled(Text)`
    position: absolute;
    top: -20px;
    font-size: ${({ theme }) => `${theme.fontSize.H6}px`};
    text-align: center;
    font-family: 'Pretendard-Medium';
`;

export {
    BarContainer,
    BarSegment,
    Circle,
    CircleWrapper,
    GraphContainer,
    LastStationText,
    SegmentText,
};
