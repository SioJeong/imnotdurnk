import { styled } from 'styled-components';

const NavContainer = styled.div`
    display: ${(props) => (props.$isVisible ? 'flex' : 'none')};
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;

    width: 25.7143rem;
    height: 3.1429rem; /* 3.1429rem -> 43.96px */

    margin: 0 auto;
    padding: 0.57rem 0.71rem; /* 8px -> 0.57rem, 10px -> 0.71rem */
`;

export { NavContainer };
