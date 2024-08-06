import { getEventDetail } from '@/services/calendar';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import { styled } from 'styled-components';
import {
    convertDateToString,
    convertTimeToString,
} from '../../hooks/useDateTimeFormatter';

const PlanDetail = () => {
    const location = useLocation();
    const planId = location.pathname.split('/')[4];

    const {
        data: planDetail,
        error,
        isError,
        isLoading,
    } = useQuery({
        queryKey: ['planDetail', planId],
        queryFn: () => getEventDetail({ planId }),
        enabled: !!planId, // planId 있을 때만 쿼리 실행
        keepPreviousData: true, // 새 데이터 가져오는 동안 이전 데이터 유지
    });
    return (
        <CreatePlanContainer>
            <h3>일정 정보</h3>
            <PlanContainer>
                <InputItemBox>
                    <img
                        src="/src/assets/icons/size_24/Icon-calendar.svg"
                        alt="date"
                    />
                    <h4>{convertDateToString(new Date(planDetail?.date))}</h4>
                </InputItemBox>
                <InputItemBox>
                    <img
                        src="/src/assets/icons/size_24/Icon-clock.svg"
                        alt="time"
                    />
                    <h4>{convertTimeToString(new Date(planDetail?.date))}</h4>
                </InputItemBox>
                <InputItemBox>
                    <img
                        src="/src/assets/icons/size_24/Icon-title.svg"
                        alt="title"
                    />
                    <TitleAndMemo>{planDetail?.title}</TitleAndMemo>
                </InputItemBox>
                <InputItemBox $boxSize="long">
                    <img
                        src="/src/assets/icons/size_24/Icon-memo.svg"
                        alt="memo"
                    />
                    <TitleAndMemo>{planDetail?.memo}</TitleAndMemo>
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

    border-radius: 10px;
    background: var(--color-white1, #fff);
`;

const TitleAndMemo = styled.h4`
    width: 13.7143rem;
    white-space: pre-wrap;
`;
