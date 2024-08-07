import { useNavigate } from 'react-router-dom';
import * as St from './GameList.style';

const GameList = () => {
    const navigate = useNavigate();

    const goToVoiceGame = () => {
        navigate('/game/voicegame');
    };

    const goToBalanceGame = () => {
        navigate('/game/balancegame');
    };

    return (
        <St.GameContainer>
            <St.GameItem onClick={goToVoiceGame}>발음 게임</St.GameItem>
            <St.GameItem>타이핑 게임</St.GameItem>
            <St.GameItem onClick={goToBalanceGame}>밸런스 게임</St.GameItem>
            <St.GameItem>기억력 게임</St.GameItem>
        </St.GameContainer>
    );
};

export default GameList;
