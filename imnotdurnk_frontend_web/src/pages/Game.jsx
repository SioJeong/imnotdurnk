import AddGameToPlan from '@/components/game/AddGameToPlan';
import BalanceGame from '@/components/game/BalanceGame';
import GameList from '@/components/game/GameList';
import GameResult from '@/components/game/GameResult';
import MemorizeGame from '@/components/game/MemorizeGame';
import TypingGame from '@/components/game/TypingGame';
import VoiceGame from '@/components/game/VoiceGame';
import VoiceGameResult from '@/components/game/VoiceGameResult';
import useGameNavigation from '@/hooks/useGameNavigation';
import { Route, Routes } from 'react-router-dom';
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
            <Route path="/typinggame" element={<TypingGame />} />
            <Route path="/memorizegame" element={<MemorizeGame />} />
            <Route path="/game-result" element={<GameResult />} />
        </Routes>
    );
};

export default Game;
