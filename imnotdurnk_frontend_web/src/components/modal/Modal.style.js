import { styled } from 'styled-components';

const ModalBackground = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    background-color: rgba(0, 0, 0, 0.4); /* 검정색, 투명도 40% */
    z-index: 1000; /* 모달을 화면 위로 올리기 위해 높은 값 사용 */
`;

const ModalContainer = styled.div`
    display: flex;
    width: 360.0002px;
    flex-direction: column;
    align-items: center;

    margin: 0 auto;
    padding: 0.7143rem 1rem 1rem 1rem;
    gap: 24.0002px;

    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1001;

    background-color: var(--color-white1, #fff);
    border-radius: 45px 45px 0px 0px;
`;

const StyledBezel = styled.img`
    display: flex;
`;

const StyledBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 332.0002px;
    padding: 1.7143rem;
    gap: 0.7143rem;
    background-color: var(--color-white2, #f7f7ec);

    border-radius: 20px;
`;

export { ModalBackground, ModalContainer, StyledBezel, StyledBox };
