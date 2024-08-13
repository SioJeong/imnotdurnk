import ToggleButton from '@/components/_button/ToggleButton';
import { useState } from 'react';
import { styled } from 'styled-components';
import AlcoholStatistics from './AlcoholStatistics';
import GameStatistics from './GameStatistics';
const Statistics = () => {
    const [isFirstSelected, setIsFirstSelected] = useState(true);

    const changeFirstToggle = () => {
        setIsFirstSelected(true);
    };
    const changeSecondToggle = () => {
        setIsFirstSelected(false);
    };

    const today = new Date();
    const year = today.getFullYear(); // 연도
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const date = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${date}`;

    return (
        <Container>
            <ToggleButton
                toggle1="Alcohol"
                toggle2="Game"
                isMono={false}
                isFirstSelected={isFirstSelected}
                changeFirstToggle={changeFirstToggle}
                changeSecondToggle={changeSecondToggle}
            />
            {isFirstSelected ? (
                <AlcoholStatistics
                    today={today}
                    formattedDate={formattedDate}
                />
            ) : (
                <GameStatistics formattedDate={formattedDate} />
            )}
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    width: 23.7143rem;
    flex-direction: column;
    align-items: center;
    gap: 2.1429rem;
`;

export default Statistics;
