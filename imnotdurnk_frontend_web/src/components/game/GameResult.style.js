import { styled } from 'styled-components';

const ResultContainer = styled.div`
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

const TitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
`;

const Title = styled.h2`
    text-align: center;
`;

const SubTitle = styled.p`
    align-self: stretch;
    color: var(--color-green2, #465a54);
    text-align: center;
    font-size: var(--font-body-h3);
`;

const ImageWrapper = styled.div`
    display: flex;
    height: 14.2143rem;
    justify-content: center;
    align-items: center;
    align-self: stretch;
`;

const ButtonBox = styled.div`
    display: flex;
    height: 9.2143rem;
    padding: 0rem 1rem;
    flex-direction: column;
    align-items: center;
    gap: 0.7143rem;
    align-self: stretch;
`;

const Highlight = styled.span`
    color: var(--color-red);
    font-size: var(--font-body-h2);
`;

export {
    ButtonBox,
    Highlight,
    ImageWrapper,
    ResultContainer,
    SubTitle,
    Title,
    TitleContainer,
};
