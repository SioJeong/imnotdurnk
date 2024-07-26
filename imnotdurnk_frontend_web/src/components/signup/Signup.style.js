import { styled } from 'styled-components';

const SignupContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 1.3571rem;

    width: 23.5rem;
    padding: 0rem 2.3571rem;
`;

const SubTitle = styled.h3`
    color: var(--color-green3, #252f2c);
    line-height: normal;
`;

const MainTitle = styled.h1`
    color: var(--color-green3, #252f2c);
    line-height: normal;
`;

export { MainTitle, SignupContainer, SubTitle };
