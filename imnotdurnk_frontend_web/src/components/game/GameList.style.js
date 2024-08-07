import { styled } from 'styled-components';

const GameContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;

    padding-top: 1rem;
`;

const GameItem = styled.h3`
    display: flex;
    justify-content: center;

    padding: 1em;
    border-radius: 1rem;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);

    cursor: pointer;
`;

export { GameContainer, GameItem };
