import styled from 'styled-components';

export const ToggleButtonContainer = styled.div`
    display: inline-flex;
    height: 2.75rem;
    padding: 0.625rem 1.5625rem;
    justify-content: center;
    align-items: center;
    gap: 1.25rem;
    border-radius: 2.8125rem;
    background: ${(props) => props.$isMono?  'var(--color-white1, #FFFFFF)' :'var(--color-white2, #F7F7EC)' } ;

`

export const ToggleButton = styled.div`
    display: flex;
    height: 1.5rem;
    padding: 0.3125rem 1.4375rem;
    justify-content: center;
    align-items: center;
    gap: 0.625rem;
    border-radius: 2.8125rem;
    background: ${(props) => props.$isSelected ? 
        props.$isMono? 'var(--color-green3, #252F2C)' : 'var(--color-red, #FF6A5F)'
        :'var(--color-white1, #FFFFFF)'}; 
`
export const StyledH4 = styled.h4`
    color: ${(props) => props.$isSelected ? 'var(--color-white1, #FFFFFF)' : 'var(--color-green3, #252F2C)'}; 
    font-size: 0.75rem; 
`