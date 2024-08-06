import { alcoholLevelToString } from '../../hooks/useAlcoholLevelFormatter';
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
    selectedAlcoholLevel,
}) => {
    const { plan, planDetail } = useCalendarStore();

    return (
        <St.AlcoholContainer>
            <St.AlcoholTitle>음주 기록</St.AlcoholTitle>
            <St.InputContainer>
                <St.DrinkInputBox onClick={openAlcoholModal}>
                    <St.InputItemBox $alcoholCount={true}>
                        <St.AlcoholCountImage
                            src="/src/assets/images/mini-soju-bottle.webp"
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
                            src="/src/assets/images/mini-beer-bottle.webp"
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
                        <img
                            src="/src/assets/icons/size_24/Icon-health.svg"
                            alt="alcohol-level"
                        />
                        <h4>만취 정도</h4>
                    </St.InputItemBoxTitle>
                    <h4>{alcoholLevelToString(planDetail.alcoholLevel)}</h4>
                </St.InputItemBox>
                <St.InputItemBox onClick={openArrivalTimeModal}>
                    <St.InputItemBoxTitle>
                        <img
                            src="/src/assets/icons/size_24/Icon-clock.svg"
                            alt="arrival-time"
                        />
                        <h4>귀가 시간</h4>
                    </St.InputItemBoxTitle>
                    <h4>{plan.arrivalTime}</h4>
                </St.InputItemBox>
            </St.InputContainer>
        </St.AlcoholContainer>
    );
};

export default EditPlanAlcohol;
