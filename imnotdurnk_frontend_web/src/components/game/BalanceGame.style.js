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

const ObjectContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
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

export { BalanceGameContainer, Description, Notice, ObjectContainer };
