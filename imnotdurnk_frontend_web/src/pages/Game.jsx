import { Route, Routes } from 'react-router-dom';
import BalanceGame from '../components/game/BalanceGame';
import GameList from '../components/game/GameList';
import VoiceGame from '../components/game/VoiceGame';
import useGameNavigation from '../hooks/useGameNavigation';

const Game = () => {
    useGameNavigation();

    return (
        <Routes>
            <Route path="/" element={<GameList />} />
            <Route path="/voicegame" element={<VoiceGame />} />
            <Route path="/balancegame" element={<BalanceGame />} />
        </Routes>
    );
};

export default Game;
