import { useTheme } from 'styled-components';
import * as St from '../_layout/globalStyle';
import {
    ChipDataView,
    ChipDataWrapper,
    InfoTitle,
    InfoView,
    PathOptionView,
    Spacer,
} from './PathOption.style';
import PathProgressBar from './PathProgressBar';

const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const formatTime = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}시간 ${minutes}분`;
};

const getChipDataStyle = (chipdata, theme) => {
    switch (chipdata) {
        case '최저 비용':
            return {
                backgroundColor: theme.colors.yellow,
                textColor: 'green3',
            };
        case '최단 시간':
            return {
                backgroundColor: theme.colors.blue,
                textColor: 'white1',
            };
        case '최소 도보':
            return {
                backgroundColor: theme.colors.green1,
                textColor: 'white1',
            };
        default:
            return {
                backgroundColor: 'transparant', // 기본 값 설정
                textColor: 'transparant', // 기본 값 설정
            };
    }
};

const PathOption = ({ pathInfo, index }) => {
    const theme = useTheme();
    const isFirstOption = index === 0;

    const { transitInfo, taxiPathInfo } = pathInfo;
    const totalTime = transitInfo.totalTime + taxiPathInfo.totalTime;

    return (
        <PathOptionView isFirstOption={isFirstOption}>
            <ChipDataView>
                {pathInfo.chipdata.map((chip, index) => {
                    const { backgroundColor, textColor } = getChipDataStyle(
                        chip,
                        theme,
                    );
                    return (
                        <ChipDataWrapper
                            key={index}
                            backgroundColor={backgroundColor}
                        >
                            <St.GlobalText color={textColor} fontSize={'H6'}>
                                {chip}
                            </St.GlobalText>
                        </ChipDataWrapper>
                    );
                })}
            </ChipDataView>
            <Spacer height={8} />
            <InfoView>
                <InfoTitle>
                    <St.GlobalText
                        fontSize={'H2'}
                        weight={'medium'}
                        color={isFirstOption ? 'white1' : 'green3'}
                    >
                        {formatNumber(taxiPathInfo.fee)}원
                    </St.GlobalText>
                    <St.GlobalText
                        fontSize={'H4'}
                        weight={'medium'}
                        color={isFirstOption ? 'white1' : 'green3'}
                    >
                        총 {formatTime(totalTime)} 소요
                    </St.GlobalText>
                </InfoTitle>
                <St.GlobalText
                    fontSize={'H6'}
                    color={isFirstOption ? 'white1' : 'green3'}
                >
                    택시비를{' '}
                    {formatNumber(taxiPathInfo.originFee - taxiPathInfo.fee)}원
                    절약하는 경로입니다
                </St.GlobalText>
            </InfoView>
            <Spacer height={30} />
            <PathProgressBar
                transitTime={transitInfo.totalTime}
                taxiTime={taxiPathInfo.totalTime}
                totalTime={totalTime}
                lastStation={transitInfo.lastStation}
                transitCount={
                    transitInfo.busTransitCount + transitInfo.subwayTransitCount
                }
                isFirstOption={isFirstOption}
            />
        </PathOptionView>
    );
};

export default PathOption;
