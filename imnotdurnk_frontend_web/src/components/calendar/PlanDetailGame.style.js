import { styled } from 'styled-components';

// 게임 기록
const GameContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.1429rem;

    padding: 1.7143rem;

    border-radius: 20px;
    background-color: var(--color-green2);
`;

const GameTitle = styled.h3`
    color: var(--color-white1);
`;

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.1429rem;
`;

const GameTypeBox = styled.div`
    display: flex;
    justify-content: space-between;
`;

const GameTypeCircle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2.8571rem;
    height: 2.8571rem;
    border-radius: 50%;
    background-color: ${({ $selected }) =>
        $selected ? 'var(--color-red)' : 'var(--color-white1)'};

    cursor: pointer;
`;

const GameLogBox = styled.ul`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.7143rem;
`;

const GameLogItem = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    padding: 0.5714rem 1.2143rem;

    border-radius: 10px;
    background-color: var(--color-white1);
`;

const GameScore = styled.div`
    display: flex;
    align-items: center;
    gap: 0.7143rem;
`;

const NoGameRecord = styled.h3`
    padding: 1rem;
    color: var(--color-white1);
`;

export {
    GameContainer,
    GameLogBox,
    GameLogItem,
    GameScore,
    GameTitle,
    GameTypeBox,
    GameTypeCircle,
    InputContainer,
    NoGameRecord,
};
