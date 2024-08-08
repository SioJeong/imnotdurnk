import { useEffect, useState } from 'react';
import { ToastError } from '../_common/alert';

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
    },
    text: {
        textAlign: 'center',
        marginBottom: 10,
    },
    circleContainer: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: 50,
        height: 50,
        marginLeft: -25,
        marginTop: -25,
    },
    circle: {
        width: 50,
        height: 50,
        borderRadius: '50%',
        backgroundColor: 'blue',
        position: 'absolute',
    },
};

const BalanceGame = () => {
    const [data, setData] = useState({
        alpha: 0,
        beta: 0,
        gamma: 0,
    });
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const updatePosition = ({ beta, gamma }) => {
        setPosition((prevPosition) => {
            let newX = prevPosition.x + gamma / 10;
            let newY = prevPosition.y + beta / 10;

            newX = Math.max(
                Math.min(newX, windowWidth / 2 - 25),
                -windowWidth / 2 + 25,
            );
            newY = Math.max(
                Math.min(newY, windowHeight / 2 - 25),
                -windowHeight / 2 + 25,
            );

            return { x: newX, y: newY };
        });
    };

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
                    // TODO: 추후 삭제 ?
                    ToastError(
                        'Permission to access device orientation was denied',
                    );
                }
            } catch (error) {
                console.error(
                    'Error requesting device orientation permission:',
                    error,
                );
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

    return (
        <div style={styles.container}>
            <div style={styles.text}>Device Angles:</div>
            <div style={styles.text}>Alpha: {data.alpha}°</div>
            <div style={styles.text}>Beta: {data.beta}°</div>
            <div style={styles.text}>Gamma: {data.gamma}°</div>
            <div style={styles.circleContainer}>
                <div
                    style={{
                        ...styles.circle,
                        transform: `translate(${position.x}px, ${position.y}px)`,
                    }}
                />
            </div>
        </div>
    );
};

export default BalanceGame;
