import styled from "styled-components";
import ButtonWithIcon from "./ButtonWithIcon";

export default function Navigation({icon1, title, icon2}) {
  return (
    <NavContainer>
              <ButtonWithIcon 
                iconname={icon1}
              />
              <h4>{title}</h4>
              <ButtonWithIcon 
                iconname={icon2}
              />
    </NavContainer>
  );
}

const NavContainer = styled.div`
  display: flex;
  height: 44px;
  min-height: 44px;
  padding: 8px 10px;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
`;

