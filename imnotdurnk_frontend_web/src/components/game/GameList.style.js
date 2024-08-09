import { styled } from 'styled-components';

const GameContainer = styled.div`
    display: grid;
    justify-items: center;
    grid-template-columns: 1fr 1fr;
    grid-row-gap: 1.4286rem;
`;

const GameItem = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;

    width: 10rem;
    padding: 1.7143rem 0rem;

    border-radius: 10px;
    background-color: ${({ $type }) => {
        switch ($type) {
            case 'voice':
                return 'var(--color-white2)';
            case 'balance':
                return 'var(--color-red)';
            case 'keyboard':
                return 'var(--color-blue)';
            case 'memorize':
                return 'var(--color-yellow)';
            default:
                return 'var(--color-white2)';
        }
    }};

    cursor: pointer;
`;

const GameImage = styled.img`
    width: 3.4286rem;
    height: 3.4286rem;
    fill: var(--color-white1);
`;

const GameText = styled.h3`
    color: ${({ $isDark }) =>
        $isDark ? 'var(--color-green3)' : 'var(--color-white2)'};
`;

export { GameContainer, GameImage, GameItem, GameText };
