import { alcoholLevelToString } from '../../hooks/useAlcoholLevelFormatter';
import {
    convertDateToString,
    formatTime,
    parseDateTime,
} from '../../hooks/useDateTimeFormatter';
import { icons } from '../../shared/constants/icons';
import * as St from './PlanDetailAlcohol.style';

const PlanDetailAlcohol = ({
    planDetailDate,
    sojuBottle,
    sojuGlass,
    beerBottle,
    beerGlass,
    arrivalTime,
    alcoholLevel,
}) => {
    const arrivalTimeString = arrivalTime ? formatTime(arrivalTime) : '-';

    const today = parseDateTime(
        convertDateToString(new Date()),
        '오전 12시 00분',
    );

    const formattedPlanDetailDate = `${planDetailDate.split('T')[0]}T00:00`;

    // // 오늘 이전(오늘 포함)에 등록하는 경우에만 알코올 관련 항목 표시
    const shouldRenderAlcoholComponent = formattedPlanDetailDate <= today;

    return (
        <St.AlcoholContainer>
            <St.AlcoholTitle>음주 기록</St.AlcoholTitle>
            <St.InputContainer>
                {shouldRenderAlcoholComponent ? (
                    <>
                        <St.DrinkInputBox>
                            <St.InputItemBox $alcoholCount={true}>
                                <St.AlcoholCountImage
                                    src={icons['miniSojuBottle']}
                                    alt="soju"
                                    $isSoju={true}
                                />
                                <h4>
                                    {sojuBottle}병 {sojuGlass}잔
                                </h4>
                            </St.InputItemBox>
                            <St.InputItemBox $alcoholCount={true}>
                                <St.AlcoholCountImage
                                    src={icons['miniBeerBottle']}
                                    alt="beer"
                                    $isSoju={false}
                                />
                                <h4>
                                    {beerBottle}병 {beerGlass}잔
                                </h4>
                            </St.InputItemBox>
                        </St.DrinkInputBox>

                        <St.InputItemBox>
                            <St.InputItemBoxTitle>
                                <img
                                    src={icons['health']}
                                    alt="alcohol-level"
                                />
                                <h4>만취 정도</h4>
                            </St.InputItemBoxTitle>
                            <h4>{alcoholLevelToString(alcoholLevel)}</h4>
                        </St.InputItemBox>
                        <St.InputItemBox>
                            <St.InputItemBoxTitle>
                                <img src={icons['clock']} alt="arrival-time" />
                                <h4>귀가 시간</h4>
                            </St.InputItemBoxTitle>
                            <h4>{arrivalTimeString}</h4>
                        </St.InputItemBox>
                    </>
                ) : (
                    <St.NoDrinkRecord>
                        아직 음주 일정 전입니다.
                    </St.NoDrinkRecord>
                )}
            </St.InputContainer>
        </St.AlcoholContainer>
    );
};

export default PlanDetailAlcohol;
