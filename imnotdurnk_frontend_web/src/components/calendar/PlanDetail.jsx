import { styled } from 'styled-components';

const PlanDetail = () => {
    return (
        <CreatePlanContainer>
            <h3>일정 정보</h3>
            <PlanContainer>
                <InputItemBox>
                    <img
                        src="/src/assets/icons/size_24/Icon-calendar.svg"
                        alt="date"
                    />
                    <h4>2024년 8월 1일</h4>
                </InputItemBox>
                <InputItemBox>
                    <img
                        src="/src/assets/icons/size_24/Icon-clock.svg"
                        alt="time"
                    />
                    <h4>오후 06시 00분</h4>
                </InputItemBox>
                <InputItemBox>
                    <img
                        src="/src/assets/icons/size_24/Icon-title.svg"
                        alt="title"
                    />
                    <h4>제목</h4>
                </InputItemBox>
                <InputItemBox $boxSize="long">
                    <img
                        src="/src/assets/icons/size_24/Icon-memo.svg"
                        alt="memo"
                    />
                    <h4>
                        메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모
                        메모메모메모메모메모메모메모메모메모메모
                    </h4>
                </InputItemBox>
            </PlanContainer>
        </CreatePlanContainer>
    );
};

export default PlanDetail;

// CreatePlan 꺼랑 동일
const CreatePlanContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.8571rem;

    padding: 1.7143rem;

    border-radius: 20px;
    background-color: var(--color-white2);
`;

const PlanContainer = styled.form`
    display: flex;
    flex-direction: column;
    gap: 0.7143rem;
`;

const InputItemBox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: ${({ $boxSize }) =>
        $boxSize === 'long' ? '0.7143rem 1.2143rem' : '0.5714rem 1.2143rem'};

    /* padding: 0.5714rem 1.2143rem; */

    border-radius: 10px;
    background: var(--color-white1, #fff);
`;
