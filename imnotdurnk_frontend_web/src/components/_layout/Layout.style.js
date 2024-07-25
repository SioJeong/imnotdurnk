import { styled } from 'styled-components';

const LayoutContainer = styled.div`
    min-width: 25.7143rem;
    max-width: 51.4286rem;
    min-height: ${(props) =>
        props.$hasNavigation ? 'calc(100vh - 3.14rem)' : '100vh'};
    margin: 0 auto;
    padding: 1rem 1rem 2rem 1rem;

    border: 1px solid black;
`;

export { LayoutContainer };
