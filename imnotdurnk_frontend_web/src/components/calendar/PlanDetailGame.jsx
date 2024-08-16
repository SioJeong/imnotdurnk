import { icons } from '@/shared/constants/icons';
import { adjustTimeZone } from '../../hooks/useDateTimeFormatter';
import * as St from './PlanDetailGame.style';

const PlanDetailGame = ({
    selectedGameType,
    setSelectedGameType,
    gameLogs,
}) => {
    const handleGameType = (index) => {
        setSelectedGameType(index);
    };

    // 선택된 게임의 기록만 필터링
    const filteredGameLogs = gameLogs.filter(
        (log) => log.gameType === selectedGameType,
    );

    return (
        <St.GameContainer>
            <St.GameTitle>게임 기록</St.GameTitle>
            <St.InputContainer>
                <St.GameTypeBox>
                    <St.GameTypeCircle
                        $selected={selectedGameType === 1}
                        onClick={() => handleGameType(1)}
                    >
                        {selectedGameType === 1 ? (
                            <img src={icons['voiceWhite']} alt="voice" />
                        ) : (
                            <img src={icons['voice']} alt="voice" />
                        )}
                    </St.GameTypeCircle>
                    <St.GameTypeCircle
                        $selected={selectedGameType === 2}
                        onClick={() => handleGameType(2)}
                    >
                        {selectedGameType === 2 ? (
                            <img src={icons['balanceWhite']} alt="balance" />
                        ) : (
                            <img src={icons['balance']} alt="balance" />
                        )}
                    </St.GameTypeCircle>

                    <St.GameTypeCircle
                        $selected={selectedGameType === 3}
                        onClick={() => handleGameType(3)}
                    >
                        {selectedGameType === 3 ? (
                            <img src={icons['keyboardWhite']} alt="keyboard" />
                        ) : (
                            <img src={icons['keyboard']} alt="keyboard" />
                        )}
                    </St.GameTypeCircle>
                    <St.GameTypeCircle
                        $selected={selectedGameType === 4}
                        onClick={() => handleGameType(4)}
                    >
                        {selectedGameType === 4 ? (
                            <img src={icons['memorizeWhite']} alt="memorize" />
                        ) : (
                            <img src={icons['memorize']} alt="memorize" />
                        )}
                    </St.GameTypeCircle>
                </St.GameTypeBox>

                <St.GameLogBox>
                    {filteredGameLogs.length > 0 ? (
                        filteredGameLogs
                            .sort((a, b) => b.score - a.score)
                            .map((log, index) => (
                                <St.GameLogItem key={index}>
                                    <St.GameScore>
                                        <img
                                            src={icons['gameLog']}
                                            alt="gamelog"
                                        />
                                        <h3>{log.score}점</h3>
                                    </St.GameScore>
                                    <h3>{adjustTimeZone(log.timeLog)}</h3>
                                </St.GameLogItem>
                            ))
                    ) : (
                        <St.NoGameRecord>
                            해당 게임 기록이 없습니다.
                        </St.NoGameRecord>
                    )}
                </St.GameLogBox>
            </St.InputContainer>
        </St.GameContainer>
    );
};

export default PlanDetailGame;
