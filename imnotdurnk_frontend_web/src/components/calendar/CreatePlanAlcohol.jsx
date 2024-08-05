import useCalendarStore from '../../stores/useCalendarStore';
import * as St from './CreatePlanAlcohol.style';

const CreatePlanAlcohol = ({ openArrivalTimeModal, openAlcoholLevelModal }) => {
    const { plan } = useCalendarStore();

    return (
        <St.AlcoholContainer>
            <St.AlcoholTitle>음주 기록</St.AlcoholTitle>
            <St.InputContainer>
                <St.InputItemBox onClick={openAlcoholLevelModal}>
                    <St.AlcoholLevel>
                        <img
                            src="/src/assets/icons/size_24/Icon-health.svg"
                            alt="alcohol-level"
                        />
                        <h4>만취 정도</h4>
                    </St.AlcoholLevel>
                    <h4>{plan.alcoholLevel}</h4>
                </St.InputItemBox>
                <St.InputItemBox onClick={openArrivalTimeModal}>
                    <St.AlcoholLevel>
                        <img
                            src="/src/assets/icons/size_24/Icon-clock.svg"
                            alt="arrival-time"
                        />
                        <h4>귀가 시간</h4>
                    </St.AlcoholLevel>
                    <h4>{plan.arrivalTime}</h4>
                </St.InputItemBox>
            </St.InputContainer>
        </St.AlcoholContainer>
    );
};

export default CreatePlanAlcohol;
