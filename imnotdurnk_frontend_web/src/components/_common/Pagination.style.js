import { styled } from 'styled-components';

export const PagesContainer = styled.div`
    display: flex;
    width: 70.9996px;
    justify-content: center;
    align-items: center;
    gap: 0.7143rem;
`;

export const Page = styled.div`
    width: 10px;
    height: 10px;
    flex-shrink: 0;
    border-radius: 100px;
    background: ${(props) =>
        props.$isCurrentPage
            ? `var(--color-green3, #252F2C)`
            : `var(--color-white2, #F7F7EC)`};
`;
