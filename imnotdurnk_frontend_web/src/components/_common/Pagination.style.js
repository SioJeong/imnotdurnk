import { styled } from 'styled-components';

export const PagesContainer = styled.div`
    display: flex;
    width: 5.0714rem;
    justify-content: center;
    align-items: center;
    gap: 10.0002px;
`;

export const Page = styled.div`
    width: 0.7143rem;
    height: 0.7143rem;
    flex-shrink: 0;
    border-radius: 100px;
    background: ${(props) =>
        props.$isCurrentPage
            ? `var(--color-green3, #252F2C)`
            : `var(--color-white2, #F7F7EC)`};
`;
