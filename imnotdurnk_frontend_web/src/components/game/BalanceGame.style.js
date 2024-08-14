import { styled } from 'styled-components';

const BalanceGameContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    height: 100vh;
    border-radius: 15px;
    background: #caeaf7;
`;

const Description = styled.div`
    text-align: center;
    display: flex;
    width: 6.2857rem;
    height: 3rem;
    justify-content: center;
    align-items: center;
    border-radius: 45px;
    margin: 10px;
    background: var(--color-red, #ff6a5f);
    color: var(--color-white1);
`;

const ObjectContainer = styled.div`
    position: absolute;
    left: 0;
    width: 100%;
    height: 85%;
`;

const Notice = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;

    position: relative;
    gap: 2rem;
    padding: 3rem;
    border-radius: 20px;
    width: 100%;
    z-index: 10;

    background-color: var(--color-white2);
`;
const GameConditionContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;
export {
    BalanceGameContainer,
    Description,
    GameConditionContainer,
    Notice,
    ObjectContainer,
};
