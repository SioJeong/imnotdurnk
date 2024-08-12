import { useCallback, useEffect, useState } from 'react';
import Duck from '../../assets/images/Duck.svg';
import Target1 from '../../assets/images/Target1.svg';
import Target2 from '../../assets/images/Target2.svg';
import Target3 from '../../assets/images/Target3.svg';
import Button from '../_button/Button';
import { ToastError, ToastWarning } from '../_common/alert';
import * as St from './BalanceGame.style';

import { useNavigate } from 'react-router-dom';

const getRandomTargetPosition = (
    windowWidth,
    windowHeight,
    duckPosition,
    minDistance = 200,
) => {
    let x, y;
    do {
        x = Math.random() * (windowWidth - 120) + 40;
        y = Math.random() * (windowHeight - 160) + 40;
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
    const duckSize = 74;

    const navigate = useNavigate();
    const [position, setPosition] = useState({
        x: windowWidth / 2 - duckSize / 2,
        y: windowHeight / 2 - duckSize / 2,
    });
    const [target, setTarget] = useState(null);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [isGameActive, setIsGameActive] = useState(false);

    const updatePosition = useCallback(
        ({ beta, gamma }) => {
            setPosition((prevPosition) => {
                let newX = prevPosition.x + gamma / 3;
                let newY = prevPosition.y + beta / 3;

                newX = Math.max(0, Math.min(newX, windowWidth - 40));
                newY = Math.max(0, Math.min(newY, windowHeight - 80));

                return { x: newX, y: newY };
            });
        },
        [windowWidth, windowHeight],
    );

    const createNewTarget = useCallback(() => {
        return {
            position: getRandomTargetPosition(
                windowWidth,
                windowHeight,
                position,
            ),
            Component: getRandomTargetImage(),
        };
    }, [windowWidth, windowHeight, position]);

    const checkIfTargetReached = useCallback(() => {
        if (!target || !isGameActive) {
            return;
        }

        const duckCenter = { x: position.x + 37, y: position.y + 37 };
        const targetCenter = {
            x: target.position.x + 20,
            y: target.position.y + 20,
        };

        const distance = Math.sqrt(
            (duckCenter.x - targetCenter.x) ** 2 +
                (duckCenter.y - targetCenter.y) ** 2,
        );

        if (distance < 40) {
            setScore((prevScore) => prevScore + 1);
            setTarget(createNewTarget());
        }
    }, [target, isGameActive, position, createNewTarget]);

    useEffect(() => {
        checkIfTargetReached();
    }, [position, checkIfTargetReached]);

    const handleOrientation = useCallback(
        (event) => {
            const { beta, gamma } = event;
            updatePosition({ beta, gamma });
        },
        [updatePosition],
    );

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
    }, [handleOrientation]);

    const startGame = () => {
        setScore(0);
        setTimeLeft(30);
        setIsGameActive(true);
        setTarget(createNewTarget());
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
    };

    const handleButtonClick = () => {
        if (isGameActive) {
            resetGame();
        } else {
            startGame();
        }
    };

    const handleFinishGame = async () => {
        ToastWarning('게임 끝', true);

        const gameScore = score >= 25 ? 100 : score * 4;

        navigate('/game/game-result', {
            state: {
                gameName: '밸런스',
                gameScore: gameScore,
            },
        });
    };

    useEffect(() => {
        if (isGameActive && timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);

            return () => clearInterval(timer);
        } else if (timeLeft === 0) {
            handleFinishGame();
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
