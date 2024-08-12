import { useNavigate } from 'react-router-dom';
import { icons } from '../../shared/constants/icons';
import * as St from './GameList.style';

const GameList = () => {
    const navigate = useNavigate();

    const goToVoiceGame = () => {
        navigate('/game/voicegame');
    };
    const goToBalanceGame = () => {
        navigate('/game/balancegame');
    };
    const goToTypingGame = () => {
        navigate('/game/typinggame');
    };
    return (
        <St.GameContainer>
            <St.GameItem onClick={goToVoiceGame} $type={'voice'}>
                <St.GameImage src={icons['voice']} alt="voice" />
                <St.GameText $isDark={true}>발음 게임</St.GameText>
            </St.GameItem>
            <St.GameItem onClick={goToBalanceGame} $type={'balance'}>
                <St.GameImage src={icons['balanceWhite']} alt="balance" />
                <St.GameText $isDark={false}>밸런스 게임</St.GameText>
            </St.GameItem>
            <St.GameItem onClick={goToTypingGame} $type={'keyboard'}>
                <St.GameImage src={icons['keyboardWhite']} alt="keyboard" />
                <St.GameText $isDark={false}>타이핑 게임</St.GameText>
            </St.GameItem>
            <St.GameItem $type={'memorize'}>
                <St.GameImage src={icons['memorize']} alt="memorize" />
                <St.GameText $isDark={true}>기억력 게임</St.GameText>
            </St.GameItem>
        </St.GameContainer>
    );
};

export default GameList;
