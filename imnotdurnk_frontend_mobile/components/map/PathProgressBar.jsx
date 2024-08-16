import { useTheme } from 'styled-components';
import * as Graph from './PathProgressBar.style';

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
        <Graph.GraphContainer>
            <Graph.BarContainer>
                <Graph.BarSegment
                    style={{
                        width: `${transitRatio}%`,
                        backgroundColor: barColor,
                    }}
                >
                    <Graph.Circle color={barColor} style={{ left: 0 }} />
                </Graph.BarSegment>
                <Graph.BarSegment
                    style={{
                        width: `${taxiRatio}%`,
                        backgroundColor: theme.colors.red,
                    }}
                >
                    <Graph.CircleWrapper style={{ left: 0 }}>
                        <Graph.Circle color={theme.colors.red} />
                        <Graph.LastStationText style={{ color: barColor }}>
                            {lastStation}
                        </Graph.LastStationText>
                    </Graph.CircleWrapper>
                    <Graph.Circle color={barColor} style={{ right: 0 }} />
                </Graph.BarSegment>
            </Graph.BarContainer>
            <Graph.BarContainer>
                <Graph.SegmentText color={barColor}>
                    대중교통 {transitCount}회
                </Graph.SegmentText>
                <Graph.SegmentText color={theme.colors.red}>택시 탑승</Graph.SegmentText>
            </Graph.BarContainer>
        </Graph.GraphContainer>
    );
};

export default PathProgressBar;
