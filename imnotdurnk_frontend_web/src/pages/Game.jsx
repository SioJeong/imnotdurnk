import AddGameToPlan from '@/components/game/AddGameToPlan';
import BalanceGame from '@/components/game/BalanceGame';
import GameList from '@/components/game/GameList';
import TypingGame from '@/components/game/TypingGame';
import VoiceGame from '@/components/game/VoiceGame';
import useGameNavigation from '@/hooks/useGameNavigation';
import { Route, Routes } from 'react-router-dom';
import GameResult from '../components/game/GameResult';

const Game = () => {
    useGameNavigation();

    return (
        <Routes>
            <Route path="/" element={<GameList />} />
            <Route path="/voicegame" element={<VoiceGame />} />
            <Route
                path="/voicegame/result/add-to-plan"
                element={<AddGameToPlan />}
            />
            <Route path="/balancegame" element={<BalanceGame />} />
            <Route path="/typinggame" element={<TypingGame />} />
            <Route path="/game-result" element={<GameResult />} />
        </Routes>
    );
};

export default Game;
