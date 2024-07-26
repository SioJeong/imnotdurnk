import { styled } from 'styled-components';

const PagesContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.7143rem;

    width: 5.0714rem;
`;

const Page = styled.div`
    flex-shrink: 0;
    width: 0.7143rem;
    height: 0.7143rem;
    border-radius: 50%;
    background: ${(props) =>
        props.$isCurrentPage
            ? `var(--color-green3, #252F2C)`
            : `var(--color-white2, #F7F7EC)`};
`;

export { Page, PagesContainer };
