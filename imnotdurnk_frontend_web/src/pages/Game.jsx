import { Route, Routes } from 'react-router-dom';
import AddGameToPlan from '../components/game/AddGameToPlan';
import BalanceGame from '../components/game/BalanceGame';
import GameList from '../components/game/GameList';
import VoiceGame from '../components/game/VoiceGame';
import VoiceGameResult from '../components/game/VoiceGameResult';
import useGameNavigation from '../hooks/useGameNavigation';

const Game = () => {
    useGameNavigation();

    return (
        <Routes>
            <Route path="/" element={<GameList />} />
            <Route path="/voicegame" element={<VoiceGame />} />
            <Route path="/voicegame/result" element={<VoiceGameResult />} />
            <Route
                path="/voicegame/result/add-to-plan"
                element={<AddGameToPlan />}
            />
            <Route path="/balancegame" element={<BalanceGame />} />
        </Routes>
    );
};

export default Game;
