import { css, styled } from 'styled-components';

// 두 가지 스타일 케이스를 정의합니다.
const bigStyle = css`
    text-align: center;
    font-size: var(--font-body-h3) !important;
    height: auto; /* 기본 스타일의 높이를 덮어쓰기 */
    color: var(--color-red, #ff6a5f);
    /* 추가로 필요한 스타일 정의 */
`;

const smallStyle = css`
    display: flex;
    align-items: center;
    align-content: center;
    padding: 0.1429rem 1.3571rem;
    height: 0.7143rem;
    gap: 0.7143rem;
    align-self: stretch;
    flex-wrap: wrap;
    color: var(--color-red, #ff6a5f);
    font-size: var(--font-body-h6);
`;

export const StyledMessage = styled.p`
    ${(props) => (props.$size === 'big' ? bigStyle : smallStyle)}
`;
