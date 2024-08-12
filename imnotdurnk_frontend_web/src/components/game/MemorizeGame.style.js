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
export const TestDiv = styled.h2`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    align-self: stretch;
    font-size: var(--font-title-h2: 1.43rem);
    flex-wrap: wrap;
    visibility: ${({ $isVisible }) => ($isVisible ? 'visible' : 'hidden')};
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
