import { styled } from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.7857rem;
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
    justify-content: ${({ $alcoholCount }) =>
        $alcoholCount ? 'center' : 'space-between'};
    align-items: center;

    ${({ $alcoholCount }) =>
        $alcoholCount &&
        `
        gap: 0.7143rem;
        min-width: 9.5rem;
    `}

    padding: ${({ $alcoholCount, $boxSize }) =>
        $alcoholCount
            ? '0.2857rem 0rem'
            : $boxSize === 'long'
              ? '0.7143rem 1.2143rem'
              : '0.5714rem 1.2143rem'};

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

// 음주 기록
const AlcoholContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.8571rem;

    padding: 1.7143rem;

    border-radius: 20px;
    background-color: var(--color-green2);
`;

const AlcoholTitle = styled.h3`
    color: var(--color-white1);
`;

const DrinkInputBox = styled.div`
    display: flex;
    justify-content: space-between;
`;

const AlcoholCountImage = styled.img`
    height: 34px;
    width: ${({ $isSoju }) => ($isSoju ? '15px' : '12px')};
`;

const InputItemBoxTitle = styled.div`
    display: flex;
    align-items: center;
    gap: 0.7143rem;
`;

export {
    AlcoholContainer,
    AlcoholCountImage,
    AlcoholTitle,
    Container,
    DrinkInputBox,
    InputContainer,
    InputItemBox,
    InputItemBoxTitle,
    MemoIconImage,
    ScheduleContainer,
    ScheduleTitle,
    TitleAndMemo,
};
