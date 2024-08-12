import { useEffect, useState } from 'react';
import Duck from '../../assets/images/Duck.svg';
import Target1 from '../../assets/images/Target1.svg';
import Target2 from '../../assets/images/Target2.svg';
import Target3 from '../../assets/images/Target3.svg';
import Button from '../_button/Button';
import { ToastError } from '../_common/alert';
import * as St from './BalanceGame.style';

const getRandomTargetPosition = (
    windowWidth,
    windowHeight,
    duckPosition,
    minDistance = 160,
) => {
    let x, y;
    do {
        x = Math.random() * (windowWidth - 120) + 40; // 타겟이 뷰포트의 좌우로 벗어나지 않도록 수정
        y = Math.random() * (windowHeight - 120) + 40; // 타겟이 뷰포트의 상하로 벗어나지 않도록 수정
    } while (
        Math.sqrt((x - duckPosition.x) ** 2 + (y - duckPosition.y) ** 2) <
        minDistance
    );
    return { x, y };
};

const getRandomTargetImage = () => {
    const images = [Target1, Target2, Target3];
    return images[Math.floor(Math.random() * images.length)];
};

const BalanceGame = () => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const duckSize = 74; // 오리의 크기
    const [position, setPosition] = useState({
        x: windowWidth / 2 - duckSize / 2, // 중앙으로 설정
        y: windowHeight / 2 - duckSize / 2, // 중앙으로 설정
    });
    const [target, setTarget] = useState(null);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [isGameActive, setIsGameActive] = useState(false);
    const [velocity, setVelocity] = useState({ x: 0, y: 0 });

    const updatePosition = ({ beta, gamma }) => {
        setPosition((prevPosition) => {
            // 새로운 속도를 계산
            const newVelocityX = velocity.x + gamma / 100;
            const newVelocityY = velocity.y + beta / 100;

            // 속도에 마찰력을 적용
            const friction = 0.98; // 마찰력, 1에 가까울수록 미끄러지는 느낌이 강해짐
            const velocityX = newVelocityX * friction;
            const velocityY = newVelocityY * friction;

            // 새로운 위치 계산
            let newX = prevPosition.x + velocityX;
            let newY = prevPosition.y + velocityY;

            // 경계를 넘지 않도록 제한
            newX = Math.max(0, Math.min(newX, windowWidth - duckSize));
            newY = Math.max(0, Math.min(newY, windowHeight - duckSize));

            // 상태 업데이트
            setVelocity({ x: velocityX, y: velocityY });
            return { x: newX, y: newY };
        });
    };

    const checkIfTargetReached = () => {
        if (!target || !isGameActive) {
            return;
        }

        const duckCenter = { x: position.x + 20, y: position.y + 20 }; // 오리 중심 계산
        const targetCenter = {
            x: target.position.x + 20,
            y: target.position.y + 20,
        }; // 타겟 중심 계산

        const distance = Math.sqrt(
            (duckCenter.x - targetCenter.x) ** 2 +
                (duckCenter.y - targetCenter.y) ** 2,
        );

        if (distance < 40) {
            // 오리와 타겟의 중심 사이의 거리가 40 이하이면 점수 추가
            setScore((prevScore) => prevScore + 1);
            const newTarget = {
                position: getRandomTargetPosition(windowWidth, windowHeight),
                Component: getRandomTargetImage(),
            };
            setTarget(newTarget);
        }
    };

    useEffect(() => {
        checkIfTargetReached();
    }, [position]);

    const handleOrientation = (event) => {
        const { beta, gamma } = event;
        updatePosition({ beta, gamma });
    };

    const requestPermission = async () => {
        if (typeof DeviceOrientationEvent.requestPermission === 'function') {
            try {
                const permissionState =
                    await DeviceOrientationEvent.requestPermission();
                if (permissionState === 'granted') {
                    window.addEventListener(
                        'deviceorientation',
                        handleOrientation,
                    );
                } else {
                    ToastError('권한이 허용되지 않았습니다');
                }
            } catch (error) {
                console.error('에러가 발생했습니다:', error);
            }
        } else {
            window.addEventListener('deviceorientation', handleOrientation);
        }
    };

    useEffect(() => {
        requestPermission();
        return () => {
            window.removeEventListener('deviceorientation', handleOrientation);
        };
    }, []);

    const startGame = () => {
        setScore(0);
        setTimeLeft(30);
        setIsGameActive(true);
        const initialTarget = {
            position: getRandomTargetPosition(
                windowWidth,
                windowHeight,
                position,
            ),
            Component: getRandomTargetImage(),
        };
        setTarget(initialTarget);
    };

    const resetGame = () => {
        const initialDuckPosition = {
            x: windowWidth / 2 - duckSize / 2,
            y: windowHeight / 2 - duckSize / 2,
        };

        setScore(0);
        setTimeLeft(30);
        setIsGameActive(false);
        setTarget(null);
        setPosition(initialDuckPosition);

        const initialTarget = {
            position: getRandomTargetPosition(
                windowWidth,
                windowHeight,
                initialDuckPosition,
            ),
            Component: getRandomTargetImage(),
        };
        setTarget(initialTarget);
    };

    const handleButtonClick = () => {
        if (isGameActive) {
            resetGame();
        } else {
            startGame();
        }
    };

    useEffect(() => {
        if (isGameActive && timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);

            return () => clearInterval(timer);
        } else if (timeLeft === 0) {
            resetGame();
        }
    }, [isGameActive, timeLeft]);

    return (
        <St.BalanceGameContainer>
            <St.Notice>
                <St.Description>
                    <h3>새끼들을 잃어버린 어미 오리가 있습니다</h3>
                    <h3>균형 감각을 발휘해보세요!</h3>
                </St.Description>
                <St.Description>점수 : {score}</St.Description>
                <Button
                    isRed={true}
                    onClick={handleButtonClick}
                    text={isGameActive ? `${timeLeft}s` : 'Start'}
                />
            </St.Notice>
            <St.ObjectContainer>
                <img
                    src={Duck}
                    alt="Duck"
                    style={{
                        position: 'absolute',
                        transform: `translate(${position.x}px, ${position.y}px) ${position.x > windowWidth / 2 ? 'scaleX(-1)' : 'scaleX(1)'}`,
                        zIndex: 20,
                    }}
                />
                {target && (
                    <img
                        src={target.Component}
                        alt="Target"
                        style={{
                            position: 'absolute',
                            transform: `translate(${target.position.x}px, ${target.position.y}px)`,
                            zIndex: 20,
                        }}
                    />
                )}
            </St.ObjectContainer>
        </St.BalanceGameContainer>
    );
};

export default BalanceGame;
