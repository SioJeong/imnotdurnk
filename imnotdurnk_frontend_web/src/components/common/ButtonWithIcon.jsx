import styled from "styled-components";

export default function ButtonWithIcon({ iconname }) {
  return (
    <StyledButton $isEmpty={iconname === "empty"}>
      {iconname !== "empty" && (
        <img src={`src/assets/icons/Icon-${iconname}.svg`} alt={`${iconname} icon`} />
      )}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  display: flex;
  padding: 2px 13px;
  justify-content: center;
  align-items: center;
  border-radius: 45px;
  background: ${props => props.$isEmpty ? 'transparent' : 'var(--color-white2, #F7F7EC)'};
  border: none;
  width: ${props => props.$isEmpty ? '24px' : 'auto'};
  height: ${props => props.$isEmpty ? '24px' : 'auto'};
  
  ${props => props.$isEmpty && `
    pointer-events: none;
    visibility: hidden;
  `}
`;