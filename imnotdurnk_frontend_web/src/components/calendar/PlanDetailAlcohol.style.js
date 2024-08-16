import { styled } from 'styled-components';

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

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.7143rem;
`;

const DrinkInputBox = styled.div`
    display: flex;
    justify-content: space-between;
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

const AlcoholCountImage = styled.img`
    height: 34px;
    width: ${({ $isSoju }) => ($isSoju ? '15px' : '12px')};
`;

const InputItemBoxTitle = styled.div`
    display: flex;
    align-items: center;
    gap: 0.7143rem;
`;

const NoDrinkRecord = styled.h3`
    padding: 1rem;
    color: var(--color-white1);
    text-align: center;
`;

export {
    AlcoholContainer,
    AlcoholCountImage,
    AlcoholTitle,
    DrinkInputBox,
    InputContainer,
    InputItemBox,
    InputItemBoxTitle,
    NoDrinkRecord,
};
