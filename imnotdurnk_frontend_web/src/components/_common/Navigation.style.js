import styled from 'styled-components';

const NavContainer = styled.div`
    display: ${(props) => (props.$isVisible ? 'flex' : 'none')};
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;

    min-width: 25.7143rem;
    max-width: 51.4286rem;
    height: 3.14rem; /* 44px -> 3.14rem */

    margin: 0 auto;
    padding: 0.57rem 0.71rem; /* 8px -> 0.57rem, 10px -> 0.71rem */

    border: 1px solid black;
`;

export { NavContainer };
