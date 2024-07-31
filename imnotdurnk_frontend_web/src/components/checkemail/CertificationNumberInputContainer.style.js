import { styled } from 'styled-components';

export const CertificationContainer = styled.div`
    display: flex;
    width: 23.7143rem;
    padding: 2.1429rem 1.7143rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    flex: 1 0 0;
    border-radius: 20px;
    background: var(--color-white2, #f7f7ec);
`;
export const MessageContainer = styled.div`
    height: 3rem;
`;
export const StyledH2 = styled.h2``;
export const InputContainer = styled.form`
    display: flex;
    height: 5.7143rem;
    min-height: 80px;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;
`;

export const Input = styled.input`
    display: flex;
    width: 4rem;
    padding: 1.5714rem 1.2857rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    background: var(--color-white1, #fff);

    border: none; /* 기본적으로 테두리 없음 */
    outline: none; /* 기본 아웃라인 없음 */
    transition: border 0.3s ease; /* 보더 변화에 애니메이션 추가 */

    &:focus {
        border: none; /* 포커스 시에도 테두리 없음 */
        outline: none; /* 기본 포커스 아웃라인 제거 */
    }

    &:active {
        border-color: var(--color-green2); /* 클릭 시 보더 색상 */
    }

    color: var(--color-green3, #252f2c);
    font-size: var(--font-title-h1);
    font-style: normal;
    font-weight: 500;
    line-height: normal;
`;
export const StyledMessage = styled.p`
    color: var(--color-green3, #252f2c);
    text-align: center;
    font-size: var(--font-body-h3, 1rem);
    line-height: normal;
`;
