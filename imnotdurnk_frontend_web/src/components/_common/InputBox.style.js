import styled from 'styled-components';

export const InputBoxContainer = styled.div`
    display: flex;
    padding: 0.4375rem 1.25rem;
    justify-content: center;
    align-items: center;
    gap: 7.1875rem;
    align-self: stretch;
    border-radius: 0.625rem;
    background: var(----color-white1, #FFF);
`;

export const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 15.5625rem;
    gap: 0.1875rem;
    flex-shrink: 0; 
`

export const InputLabel = styled.label`
    align-self: stretch;
    color: var(----color-green3, #252F2C);
    font-family: Pretendard;
    font-size: 0.5rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
`

export const Input = styled.input`
    align-self: stretch;    
    color: var(----color-green3, #252F2C);
    border: none; 
    outline: none;
    font-family: Pretendard;
    font-size: 0.625rem;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
`

export const InputIcon= styled.img`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    width: 1.5rem;
    height: 1.5rem;
    ${(props) =>
        props.$isEmpty &&
        `
    pointer-events: none;
    visibility: hidden;
  `}

`



