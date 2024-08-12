import { styled } from 'styled-components';

const BalanceGameContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    height: 100vh;
`;

const Description = styled.div`
    text-align: center;
`;

const CircleContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    width: 50px;
    height: 50px;
    margin-left: -25px;
    margin-top: -25px;
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

    background-color: var(--color-white2);
`;

export { BalanceGameContainer, CircleContainer, Description, Notice };
