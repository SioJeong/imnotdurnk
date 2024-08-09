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
                <AlcoholStatistics />
            ) : (
                <GameStatistics>아직</GameStatistics>
            )}
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    width: 332px;
    flex-direction: column;
    align-items: center;
    gap: 2.1429rem;
`;

export default Statistics;
