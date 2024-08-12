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
    currentPosition,
    minDistance = 100,
) => {
    let x, y;
    do {
        x = Math.random() * (windowWidth - 40) - (windowWidth / 2 - 20);
        y = Math.random() * (windowHeight - 40) - (windowHeight / 2 - 20);
    } while (
        Math.sqrt((x - currentPosition.x) ** 2 + (y - currentPosition.y) ** 2) <
        minDistance
    );
    return { x, y };
};

const getRandomTargetImage = () => {
    const images = [Target1, Target2, Target3];
    return images[Math.floor(Math.random() * images.length)];
};

const BalanceGame = () => {
    const [data, setData] = useState({ alpha: 0, beta: 0, gamma: 0 });
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [target, setTarget] = useState(null);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [isGameActive, setIsGameActive] = useState(false);

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const updatePosition = ({ beta, gamma }) => {
        setPosition((prevPosition) => {
            let newX = prevPosition.x + gamma / 10;
            let newY = prevPosition.y + beta / 10;

            newX = Math.max(
                Math.min(newX, windowWidth / 2 - 37),
                -windowWidth / 2 + 37,
            );
            newY = Math.max(
                Math.min(newY, windowHeight / 2 - 37),
                -windowHeight / 2 + 37,
            );

            return { x: newX, y: newY };
        });
    };

    const checkIfTargetReached = () => {
        if (!target || !isGameActive || !target.position) {
            return;
        }

        const distance = Math.sqrt(
            (position.x - target.position.x) ** 2 +
                (position.y - target.position.y) ** 2,
        );

        if (distance < 20) {
            setScore((prevScore) => prevScore + 1);
            // 새 타겟 생성
            const newTarget = {
                position: getRandomTargetPosition(
                    windowWidth,
                    windowHeight,
                    position,
                ),
                Component: getRandomTargetImage(),
            };
            setTarget(newTarget);
        }
    };

    useEffect(() => {
        checkIfTargetReached();
    }, [position]); // 무한 루프 방지를 위해 target과 score 업데이트가 없도록 한다

    const handleOrientation = (event) => {
        const { alpha, beta, gamma } = event;
        setData({
            alpha: Math.round(alpha),
            beta: Math.round(beta),
            gamma: Math.round(gamma),
        });
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
        // 초기 타겟 생성
        const initialTarget = {
            position: getRandomTargetPosition(windowWidth, windowHeight, {
                x: 0,
                y: 0,
            }),
            Component: getRandomTargetImage(),
        };
        setTarget(initialTarget);
    };

    const resetGame = () => {
        setScore(0);
        setTimeLeft(30);
        setIsGameActive(false);
        setTarget(null);
        setPosition({ x: 0, y: 0 });
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
            <St.CircleContainer>
                <img
                    src={Duck}
                    alt="Duck"
                    style={{
                        transform: `translate(${position.x}px, ${position.y}px) ${
                            position.x > 0 ? 'scaleX(-1)' : ''
                        }`,
                    }}
                />
                {target && (
                    <img
                        src={target.Component}
                        alt="Target"
                        style={{
                            position: 'absolute',
                            transform: `translate(${target.position.x}px, ${target.position.y}px)`,
                        }}
                    />
                )}
            </St.CircleContainer>
        </St.BalanceGameContainer>
    );
};

export default BalanceGame;
