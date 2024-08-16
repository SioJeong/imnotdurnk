import { styled } from 'styled-components';

const PlanDetailContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const PlanDetailBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.7857rem;
`;

const LoadingBox = styled.div`
    padding: 8rem 0;
`;

const LoadingAndErrorText = styled.h3`
    padding-top: 3rem;
    text-align: center;
`;

// 일정 정보
const ScheduleContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.8571rem;

    padding: 1.7143rem;

    border-radius: 20px;
    background-color: ${({ $alcoholLevel }) => {
        switch ($alcoholLevel) {
            case 1:
                return 'var(--color-yellow)';
            case 2:
                return 'var(--color-green1)';
            case 3:
                return 'var(--color-red)';
            default:
                return 'var(--color-white2)';
        }
    }};
`;

const ScheduleTitle = styled.h3`
    color: ${({ $alcoholLevel }) =>
        $alcoholLevel >= 2 ? 'var(--color-white1)' : 'var(--color-green3)'};
`;

const InputContainer = styled.div`
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

const MemoIconImage = styled.img`
    align-self: flex-start;
`;

export {
    InputContainer,
    InputItemBox,
    LoadingAndErrorText,
    LoadingBox,
    MemoIconImage,
    PlanDetailBox,
    PlanDetailContainer,
    ScheduleContainer,
    ScheduleTitle,
    TitleAndMemo,
};
