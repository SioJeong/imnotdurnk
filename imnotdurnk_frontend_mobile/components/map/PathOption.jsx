import { useNavigation } from '@react-navigation/native';
import { Pressable } from 'react-native';
import { useTheme } from 'styled-components';
import { formatCurrency } from '../../hooks/useCurrencyFormatter';
import { formatMinutes } from '../../hooks/useMinutesConverter';
import * as St from '../_layout/globalStyle';
import * as Map from './PathOption.style';
import PathProgressBar from './PathProgressBar';

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
                backgroundColor: 'transparent', // 기본 값 설정
                textColor: 'transparent', // 기본 값 설정
            };
    }
};

const PathOption = ({ pathInfo, index }) => {
    const theme = useTheme();
    const navi = useNavigation();
    const isFirstOption = index === 0;

    const { transitInfo, taxiPathInfo } = pathInfo;
    const totalTime = transitInfo.totalTime + taxiPathInfo.totalTime;

    return (
        <Pressable onPress={() => navi.navigate('PathDetail', { pathInfo })}>
            <Map.PathOptionView isFirstOption={isFirstOption}>
                <Map.ChipDataView>
                    {pathInfo.chipdata.map((chip, index) => {
                        const { backgroundColor, textColor } = getChipDataStyle(
                            chip,
                            theme,
                        );
                        return (
                            <Map.ChipDataWrapper
                                key={index}
                                backgroundColor={backgroundColor}
                            >
                                <St.GlobalText
                                    color={textColor}
                                    fontSize={'H6'}
                                >
                                    {chip}
                                </St.GlobalText>
                            </Map.ChipDataWrapper>
                        );
                    })}
                </Map.ChipDataView>
                <Map.Spacer height={8} />
                <Map.InfoView>
                    <Map.InfoTitle>
                        <St.GlobalText
                            fontSize={'H2'}
                            weight={'medium'}
                            color={isFirstOption ? 'white1' : 'green3'}
                        >
                            {formatCurrency(taxiPathInfo.fee)}원
                        </St.GlobalText>
                        <St.GlobalText
                            fontSize={'H4'}
                            weight={'medium'}
                            color={isFirstOption ? 'white1' : 'green3'}
                        >
                            총 {formatMinutes(totalTime)} 소요
                        </St.GlobalText>
                    </Map.InfoTitle>
                    <St.GlobalText
                        fontSize={'H6'}
                        color={isFirstOption ? 'white1' : 'green3'}
                    >
                        택시비를{' '}
                        {formatCurrency(
                            taxiPathInfo.originFee - taxiPathInfo.fee,
                        )}
                        원 절약하는 경로입니다
                    </St.GlobalText>
                </Map.InfoView>
                <Map.Spacer height={30} />
                <PathProgressBar
                    transitTime={transitInfo.totalTime}
                    taxiTime={taxiPathInfo.totalTime}
                    totalTime={totalTime}
                    lastStation={transitInfo.lastStation}
                    transitCount={
                        transitInfo.busTransitCount +
                        transitInfo.subwayTransitCount
                    }
                    isFirstOption={isFirstOption}
                />
            </Map.PathOptionView>
        </Pressable>
    );
};

export default PathOption;
