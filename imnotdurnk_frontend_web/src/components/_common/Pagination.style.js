import styled from 'styled-components';


export const PagesContainer = styled.div`
    display: flex;
    width: 4.4375rem;
    justify-content: center;
    align-items: center;
    gap: 0.625rem;
`  

export const Page = styled.div`
    width: 0.625rem;
    height: 0.625rem;
    flex-shrink: 0;
    border-radius: 6.25rem;
    background: ${(props) => props.$isCurrentPage?  `var(--color-green3, #252F2C)` : `var(--color-white2, #F7F7EC)`};
`  
