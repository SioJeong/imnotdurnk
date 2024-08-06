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
            case '수도권 1호선':
                return '#0052A4';
            case '수도권 2호선':
                return '#00A84D';
            case '수도권 3호선':
                return '#EF7C1C';
            case '수도권 4호선':
                return '#00A5DE';
            case '수도권 5호선':
                return '#996CAC';
            case '수도권 6호선':
                return '#CD7C2F';
            case '수도권 7호선':
                return '#747F00';
            case '수도권 8호선':
                return '#E6186C';
            case '수도권 9호선':
                return '#BDB092';
            case '수도권 경의중앙선':
                return '#77C4A3';
            case '수도권 경춘선':
                return '#0C8E72';
            case '수도권 인천1호선':
                return '#7CA8D5';
            case '수도권 인천2호선':
                return '#ED8B00';
            case '수도권 수인.분당선':
                return '#FABE00';
            case '수도권 신분당선':
                return '#D4003B';
            case '수도권 의정부경전철':
                return '#FDA600';
            case '수도권 에버라인':
                return '#6FB245';
            case '수도권 김포골드라인':
                return '#A17800';
            case '수도권 우이신설경전철':
                return '#B7C452';
            case '수도권 서해선':
                return '#8FC31F';
            case '수도권 공항철도':
                return '#0090D2';
            case '수도권 신림선':
                return '#6789CA';
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
                            {renderIconWithStyle(path.trafficType, path.name)}
                            <St.GlobalText
                                weight={'medium'}
                                fontSize="H3"
                                color="green3"
                            >
                                {path.name}
                            </St.GlobalText>
                        </Map.InfoTitleView>
                        <Map.InfoDurationView>
                            <St.GlobalText fontSize="H5" color="green3">
                                총 {path.stationCount} 정거장
                            </St.GlobalText>
                            <St.GlobalText fontSize="H5" color="green3">
                                총 {formatMinutes(path.sectionTime)} 소요
                            </St.GlobalText>
                        </Map.InfoDurationView>
                    </Map.InfoHeaderView>
                    <St.GlobalText fontSize="H5" color="green3">
                        {path.startName}
                        {path.trafficType === 1 ? '역' : ''} 탑승{` - `}
                        {path.endName}
                        {path.trafficType === 1 ? '역' : ''} 하차
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
