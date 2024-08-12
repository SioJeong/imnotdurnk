import { create } from 'zustand';

// 발음 게임
const useVoiceGameStore = create((set) => ({
    voiceGameResult: {
        planId: 0,
        score: 0,
        filename: '',
        script: '',
    },
    setVoiceGameResult: (result) =>
        set((state) => ({
            voiceGameResult: { ...state.voiceGameResult, ...result },
        })),
    resetVoiceGameResult: () =>
        set({
            voiceGameResult: {
                planId: 0,
                score: 0,
                filename: '',
                script: '',
            },
        }),
}));

// TODO : 전역으로 데이터 저장
// game-los/save API 연결에 필요한 데이터
// planID, gameType, score 세개 필요
// {
//     "planId": 0,
//     "gameType": 0,
//     "score": 0,
//     "timeLog": { // 저장 따로 안해도 됨!
//       "hour": 0,
//       "minute": 0,
//       "second": 0,
//       "nano": 0
//     }
//   }

// 밸런스 게임
const useBalanceGameStore = create((set) => ({
    // 전역 변수 및 함수들
}));

// 타이핑 게임
const useTypingGameStore = create((set) => ({
    typingGameResult: {
        planId: 0,
        gameType: 2,
        score: 0,
    },
    setTypingGameResult: (result) =>
        set((state) => ({
            typingGameResult: { ...state.typingGameResult, ...result },
        })),
    resetTypingGameResult: () =>
        set({
            typingGameResult: {
                planId: 0,
                gameType: 2,
                score: 0,
            },
        }),
}));

// 기억력 게임

const useGameStore = () => {
    const voiceGameState = useVoiceGameStore();
    const balanceGameState = useBalanceGameStore();
    return { ...voiceGameState, ...balanceGameState };
};

export default useGameStore;
