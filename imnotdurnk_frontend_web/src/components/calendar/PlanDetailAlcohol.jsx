import { alcoholLevelToString } from '../../hooks/useAlcoholLevelFormatter';
import { formatTime } from '../../hooks/useDateTimeFormatter';
import { icons } from '../../shared/constants/icons';
import * as St from './PlanDetailAlcohol.style';

const PlanDetailAlcohol = ({
    sojuBottle,
    sojuGlass,
    beerBottle,
    beerGlass,
    arrivalTime,
    alcoholLevel,
}) => {
    const arrivalTimeString = arrivalTime ? formatTime(arrivalTime) : '-';

    return (
        <St.AlcoholContainer>
            <St.AlcoholTitle>음주 기록</St.AlcoholTitle>
            <St.InputContainer>
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
                        <img src={icons['health']} alt="alcohol-level" />
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
            </St.InputContainer>
        </St.AlcoholContainer>
    );
};

export default PlanDetailAlcohol;
