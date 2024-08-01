import ToggleButton from '@/components/_button/ToggleButton';
import { useState } from 'react';
import { styled } from 'styled-components';
import AlcoholStatistics from '../statistics/AlcoholStatistics';
import GameStatistics from '../statistics/GameStatistics';
const Statistics = () => {
    const [isFirstSelected, setIsFirstSelected] = useState(true);
    const changeToggle = () => {
        setIsFirstSelected(!isFirstSelected);
    };
    return (
        <Container>
            <ToggleButton
                toggle1="Alcohol"
                toggle2="Game"
                isMono={false}
                isFirstSelected={isFirstSelected}
                changeToggle={changeToggle}
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
    gap: 30px;
`;

export default Statistics;
