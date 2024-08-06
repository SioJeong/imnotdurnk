import { useTheme } from 'styled-components';
import {
    BarContainer,
    BarSegment,
    Circle,
    CircleWrapper,
    GraphContainer,
    LastStationText,
    SegmentText,
} from './PathProgressBar.style';

const PathProgressBar = ({
    transitTime,
    taxiTime,
    totalTime,
    lastStation,
    transitCount,
    isFirstOption,
}) => {
    const theme = useTheme();
    const transitRatio = (transitTime / totalTime) * 100;
    const taxiRatio = (taxiTime / totalTime) * 100;

    const barColor = isFirstOption ? theme.colors.white1 : theme.colors.green3;

    return (
        <GraphContainer>
            <BarContainer>
                <BarSegment
                    style={{
                        width: `${transitRatio}%`,
                        backgroundColor: barColor,
                    }}
                >
                    <Circle color={barColor} style={{ left: 0 }} />
                </BarSegment>
                <BarSegment
                    style={{
                        width: `${taxiRatio}%`,
                        backgroundColor: 'red',
                    }}
                >
                    <CircleWrapper style={{ left: 0 }}>
                        <Circle color={theme.colors.red} />
                        <LastStationText style={{ color: barColor }}>
                            {lastStation}
                        </LastStationText>
                    </CircleWrapper>
                    <Circle color={barColor} style={{ right: 0 }} />
                </BarSegment>
            </BarContainer>
            <BarContainer>
                <SegmentText color={barColor}>
                    대중교통 {transitCount}회
                </SegmentText>
                <SegmentText color={barColor}>택시 탑승</SegmentText>
            </BarContainer>
        </GraphContainer>
    );
};

export default PathProgressBar;
