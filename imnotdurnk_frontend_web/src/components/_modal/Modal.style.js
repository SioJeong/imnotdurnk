import { keyframes, styled } from 'styled-components';

const slideUp = keyframes`
  from {
    transform: translate(-50%, 100%);
  }
  to {
    transform: translate(-50%, 0%);
  }
`;

const slideDown = keyframes`
  from {
    transform: translate(-50%, 0%);
  }
  to {
    transform: translate(-50%, 100%);
  }
`;

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
    width: 25.7143rem;
    flex-direction: column;
    align-items: center;

    margin: 0 auto;
    padding: 0.7143rem 1rem 1rem 1rem;
    gap: 1.7143rem;

    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1001;

    background-color: var(--color-white1, #fff);
    border-radius: 45px 45px 0px 0px;

    // TODO: modal 닫힐 때 애니메이션 적용 아직 안됨 (isClosing 함수 처리 필요)
    animation: ${({ isClosing }) => (isClosing ? slideDown : slideUp)} 0.5s
        ease-out;
`;

const StyledBezel = styled.img`
    display: flex;
`;

const StyledBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 23.7143rem;
    padding: 1.7143rem;
    gap: 0.7143rem;
    background-color: var(--color-white2, #f7f7ec);

    border-radius: 20px;
`;

const StyledFormBox = styled.div`
    display: flex;
    /* flex-direction: column; */
    flex-direction: ${({ $direction }) =>
        $direction === 'row' ? 'row' : 'column'};
    gap: 0.7143rem;
`;

const StyledIcon = styled.img`
    width: 11rem;
    height: 11rem;
`;

const StyledStepperHeader = styled.div`
    display: flex;
    width: 19.9286rem;
    justify-content: space-between;
    align-items: center;
`;

const StyledStepperBody = styled.div`
    display: flex;
    width: 17.7857rem;
    justify-content: center;
    align-items: center;
    gap: 2.1429rem;
`;

const StyledStepperElement = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const StyledStepperImage = styled.img`
    display: flex;
    height: 7.1429rem;
    justify-content: center;
    align-items: flex-end;
    object-fit: cover;
`;

export {
    ModalBackground,
    ModalContainer,
    StyledBezel,
    StyledBox,
    StyledFormBox,
    StyledIcon,
    StyledStepperBody,
    StyledStepperElement,
    StyledStepperHeader,
    StyledStepperImage,
};
