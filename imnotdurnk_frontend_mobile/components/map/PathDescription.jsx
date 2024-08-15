import Bus from '../../assets/icons/size_24/Icon-bus.svg';
import Subway from '../../assets/icons/size_24/Icon-subway.svg';
import Taxi from '../../assets/icons/size_24/Icon-taxi.svg';
import { formatCurrency } from '../../hooks/useCurrencyFormatter';
import { formatMinutes } from '../../hooks/useMinutesConverter';
import * as St from '../_layout/globalStyle';
import * as Map from './PathDescription.style';

const PathDescription = ({ pathInfo }) => {
    const { transitInfo, taxiPathInfo } = pathInfo;

    const handleRenderedIcon = (trafficType) => {
        return trafficType === 1 ? Subway : Bus;
    };

    const getSubwayColor = (laneName) => {
        switch (laneName) {
            case '서울1호선':
                return '#0052A4';
            case '서울2호선':
                return '#00A84D';
            case '서울3호선':
                return '#EF7C1C';
            case '서울4호선':
                return '#00A5DE';
            case '서울5호선':
                return '#996CAC';
            case '서울6호선':
                return '#CD7C2F';
            case '서울7호선':
                return '#747F00';
            case '서울8호선':
                return '#E6186C';
            case '서울9호선':
                return '#BDB092';
            case '경의중앙선':
                return '#77C4A3';
            case '경춘선':
                return '#0C8E72';
            case '인천1호선':
                return '#7CA8D5';
            case '인천2호선':
                return '#ED8B00';
            case '수인분당선':
                return '#FABE00';
            case '신분당선':
                return '#D4003B';
            case '서해선':
                return '#8FC31F';
            default:
                return 'transparent';
        }
    };

    const renderIconWithStyle = (trafficType, laneName) => {
        const IconComponent = handleRenderedIcon(trafficType);
        const backgroundColor = getSubwayColor(laneName);
        return (
            <IconComponent
                style={{
                    backgroundColor,
                    borderRadius: 45,
                }}
            />
        );
    };

    return (
        <Map.DescriptionContainer>
            <St.GlobalText fontSize="H5" color="green3">
                목적지 근처에 도착하면 안내가 종료됩니다{'\n'}귀가 시간을
                자동으로 기록해드릴게요
            </St.GlobalText>
            <St.GlobalText weight={'medium'} fontSize="H3" color="green3">
                전체 이동 경로
            </St.GlobalText>
            {transitInfo.transitPathInfo.map((path, index) => (
                <Map.InfoView key={index}>
                    <Map.InfoHeaderView>
                        <Map.InfoTitleView>
                            {renderIconWithStyle(path.type, path.route)}
                            <St.GlobalText
                                weight={'medium'}
                                fontSize="H3"
                                color="green3"
                            >
                                {path.route}
                            </St.GlobalText>
                        </Map.InfoTitleView>
                        <Map.InfoDurationView>
                            <St.GlobalText fontSize="H5" color="green3">
                                총 {path.stopCnt} 정거장
                            </St.GlobalText>
                            <St.GlobalText fontSize="H5" color="green3">
                                총 {formatMinutes(path.duration)} 소요
                            </St.GlobalText>
                        </Map.InfoDurationView>
                    </Map.InfoHeaderView>
                    <St.GlobalText fontSize="H5" color="green3">
                        {path.start}
                        {path.type === 1 ? '역' : ''} 탑승{` - `}
                        {path.end}
                        {path.type === 1 ? '역' : ''} 하차
                    </St.GlobalText>
                </Map.InfoView>
            ))}
            <Map.InfoView>
                <Map.InfoTitleView>
                    <Taxi />
                    <St.GlobalText
                        weight={'medium'}
                        fontSize="H3"
                        color="green3"
                    >
                        택시 탑승
                    </St.GlobalText>
                </Map.InfoTitleView>
                <Map.InfoHeaderView>
                    <St.GlobalText fontSize="H5" color="green3">
                        예상 요금 {formatCurrency(taxiPathInfo.fee)}원
                    </St.GlobalText>
                    <Map.InfoDurationView>
                        <St.GlobalText fontSize="H5" color="green3">
                            약 {taxiPathInfo.totalDistance}km
                        </St.GlobalText>
                        <St.GlobalText fontSize="H5" color="green3">
                            총 {formatMinutes(taxiPathInfo.totalTime)} 소요
                        </St.GlobalText>
                    </Map.InfoDurationView>
                </Map.InfoHeaderView>
            </Map.InfoView>
        </Map.DescriptionContainer>
    );
};

export default PathDescription;
