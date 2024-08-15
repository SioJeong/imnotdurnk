import { keyframes, styled } from 'styled-components';
import { icons } from '../../shared/constants/icons';

const Loading = ({ text = '데이터를 불러오는 중입니다.' }) => {
    return (
        <LoadingContainer>
            <ImageBox>
                <BeerImageLeft src={icons['loadingBeerLeft']} alt="loading" />
                <BeerImageRight src={icons['loadingBeerRight']} alt="loading" />
            </ImageBox>
            <Dots>
                <Dot delay="0s" />
                <Dot delay="0.2s" />
                <Dot delay="0.4s" />
            </Dots>
            <h4>{text}</h4>
        </LoadingContainer>
    );
};

export default Loading;

// 왼쪽 잔 애니메이션
const cheersLeft = keyframes`
    0%, 100% {
        transform: translate(0, 0) rotate(0deg);
    }
    25% {
        transform: translate(-10px, 20px) rotate(20deg);
    }
    50% {
        transform: translate(20px, 0px) rotate(0deg);
    }
    75% {
        transform: translate(-10px, -30px) rotate(-20deg);
    }
`;

// 오른쪽 잔 애니메이션
const cheersRight = keyframes`
    0% , 100%{
        transform: translate(0, 0) rotate(0deg);
    }
    25% {
        transform: translate(10px, 20px) rotate(-20deg);
    }
    50% {
        transform: translate(-20px, 0px) rotate(0deg);
    }
    75% {
        transform: translate(10px, -30px) rotate(20deg);
    }
`;

// 작은 동그라미 점들이 크기 변화 및 투명도 변화하는 애니메이션
const pulse = keyframes`
    0%, 100% {
        transform: scale(1);
        opacity: 0.3;
    }
    50% {
        transform: scale(1.3);
        opacity: 1;
    }
`;

const LoadingContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    gap: 2rem;
`;

const ImageBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const BeerImageLeft = styled.img`
    width: 3.5rem;
    height: 3.5rem;
    animation: ${cheersLeft} 1s ease infinite;
    transform-origin: center center;
`;

const BeerImageRight = styled.img`
    width: 3.5rem;
    height: 3.5rem;
    animation: ${cheersRight} 1s ease infinite;
    transform-origin: center left;
`;

const Dots = styled.div`
    display: flex;
    justify-content: space-between;
    width: 3.5rem;
`;

const Dot = styled.div`
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background-color: #ffa500;

    animation: ${pulse} 1s ease-in-out infinite;
    animation-delay: ${({ delay }) => delay};
`;
