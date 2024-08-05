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

const InputItemBox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: ${({ $boxSize }) =>
        $boxSize === 'long' ? 'flex-start' : 'center'};

    padding: ${({ $boxSize }) =>
        $boxSize === 'long' ? '0.7143rem 1.2143rem' : '0.5714rem 1.2143rem'};

    border-radius: 10px;
    background: var(--color-white1, #fff);

    cursor: pointer;
`;

const AlcoholLevel = styled.div`
    display: flex;
    align-items: center;
    gap: 0.7143rem;
`;

export {
    AlcoholContainer,
    AlcoholLevel,
    AlcoholTitle,
    InputContainer,
    InputItemBox,
};
