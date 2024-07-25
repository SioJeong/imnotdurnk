import { styled } from 'styled-components';

const LayoutContainer = styled.div`
    width: 360px;
    min-height: ${(props) =>
        props.$hasNavigation ? 'calc(100vh - 3.14rem)' : '100vh'};
    margin: 0 auto;
    padding: 1rem 1rem 2rem 1rem;
`;

export { LayoutContainer };
