import styled from 'styled-components';

export const InputBoxContainer = styled.div`
    display: flex;
    padding: 0.4375rem   ${(props) => props.$size === 'small' ? '1rem':'1.25rem'};
    justify-content: space-between;
    align-items: center;
    ${(props) => props.$size === 'small' && `
        width: 15rem; 
      `}
    border-radius: 0.625rem;
    background: var(----color-white1, #FFF);
`;

export const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 0.3125rem; 
    
`

export const InputLabel = styled.h6`
    align-self: stretch;
    color: var(----color-green3, #252F2C);
    font-size: 0.5rem;
    
`

export const Input = styled.input`
    font-size: var(--font-body-h5, 0.71rem);
    border: none;
    outline: none;
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



