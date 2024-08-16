import { icons } from '@/shared/constants/icons';
import { alcoholLevelToString } from '../../hooks/useAlcoholLevelFormatter';
import { formatTime } from '../../hooks/useDateTimeFormatter';
import useCalendarStore from '../../stores/useCalendarStore';
import * as St from './CreatePlanAlcohol.style';

const EditPlanAlcohol = ({
    openAlcoholModal,
    openAlcoholLevelModal,
    openArrivalTimeModal,
    selectedSojuBottleCount,
    selectedSojuGlassCount,
    selectedBeerBottleCount,
    selectedBeerGlassCount,
}) => {
    const { planDetail } = useCalendarStore();

    const formattedArrivalTime = planDetail.arrivalTime
        ? formatTime(planDetail.arrivalTime)
        : '-';

    return (
        <St.AlcoholContainer>
            <St.AlcoholTitle>음주 기록</St.AlcoholTitle>
            <St.InputContainer>
                <St.DrinkInputBox onClick={openAlcoholModal}>
                    <St.InputItemBox $alcoholCount={true}>
                        <St.AlcoholCountImage
                            src={icons['miniSojuBottle']}
                            alt="soju"
                            $isSoju={true}
                        />
                        <h4>
                            {selectedSojuBottleCount}병 {selectedSojuGlassCount}
                            잔
                        </h4>
                    </St.InputItemBox>
                    <St.InputItemBox $alcoholCount={true}>
                        <St.AlcoholCountImage
                            src={icons['miniBeerBottle']}
                            alt="beer"
                            $isSoju={false}
                        />
                        <h4>
                            {selectedBeerBottleCount}병 {selectedBeerGlassCount}
                            잔
                        </h4>
                    </St.InputItemBox>
                </St.DrinkInputBox>

                <St.InputItemBox onClick={openAlcoholLevelModal}>
                    <St.InputItemBoxTitle>
                        <img src={icons['health']} alt="alcohol-level" />
                        <h4>만취 정도</h4>
                    </St.InputItemBoxTitle>
                    <h4>{alcoholLevelToString(planDetail.alcoholLevel)}</h4>
                </St.InputItemBox>
                <St.InputItemBox onClick={openArrivalTimeModal}>
                    <St.InputItemBoxTitle>
                        <img src={icons['clock']} alt="arrival-time" />
                        <h4>귀가 시간</h4>
                    </St.InputItemBoxTitle>
                    <h4>{formattedArrivalTime}</h4>
                </St.InputItemBox>
            </St.InputContainer>
        </St.AlcoholContainer>
    );
};

export default EditPlanAlcohol;
