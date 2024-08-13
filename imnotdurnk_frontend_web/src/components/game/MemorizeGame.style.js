import { styled } from 'styled-components';

export const TypingGameContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-items: flex-start;
    gap: 1.9857rem;

    padding: 1.8571rem 1.7143rem;
    width: 23.5rem;
    border-radius: 20px;
    background: var(--color-white2, #f7f7ec);
`;

export const TitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.3571rem;
    align-self: stretch;
`;

export const Title = styled.h2`
    align-self: stretch;
    text-align: center;
`;
export const SubTitle = styled.p`
    align-self: stretch;
    text-align: center;
`;

export const TimerBox = styled.div`
    display: flex;
    padding: 0rem 0.5714rem;
    justify-content: flex-end;
    align-items: center;
    gap: 0.7143rem;
    align-self: stretch;
`;

export const ButtonBox = styled.div`
    display: flex;
    padding: 0rem 1rem;
    justify-content: center;
    align-items: center;
    gap: 2.8571rem;
    align-self: stretch;
`;

export const StyledSpan = styled.span`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: ${({ $isSpace }) => ($isSpace ? '0.5857rem' : 'auto')};
    height: 1.7143rem;
    gap: 0.7143rem;
    color: ${({ $color }) => $color};
    font-size: var(--font-title-h2: 1.43rem);
    border-bottom: ${({ $isSpace }) =>
        $isSpace ? '1px var(--color-green3) dotted' : 'none'};
`;

//카드 놓인 곳
export const TestDiv = styled.h2`
    display: flex;
    padding: 0.7143rem 0rem;
    justify-content: center;
    align-items: center;
    align-content: center;
    gap: 0.7143rem;
    align-self: stretch;
    flex-wrap: wrap;
    visibility: ${({ $isVisible }) => ($isVisible ? 'visible' : 'hidden')};
`;
export const Card = styled.div`
    width: 4.3571rem;
    height: 6.1429rem;
    border-radius: 0.3571rem;
    perspective: 1000px;
    cursor: pointer;
    position: relative;
    transition: transform 0.6s;

    &:hover .card-inner {
        transform: rotateY(180deg);
    }
`;
export const CardFront = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    border-radius: 10px;
    color: white;
    font-weight: bold;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

    background: var(--color-yellow);
`;

export const CardBack = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px; //없
    border-radius: 10px;
    color: white;
    font-weight: bold;
    transform: rotateY(180deg);
    background-color: var(--color-white1);
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;
export const CardImage = styled.img``;
export const CardInner = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    transition: transform 0.6s;
    transform-style: preserve-3d;

    border-radius: 10px;
    transform: ${({ isFlipped }) =>
        isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'};
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;
