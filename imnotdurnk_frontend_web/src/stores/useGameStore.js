import { create } from 'zustand';

// 발음 게임
const useVoiceGameStore = create((set) => ({
    voiceGameResult: {
        planId: 0,
        score: 0,
        filename: '',
        script: '',
    },
    isVoiceGameResultSet: false,
    setVoiceGameResult: (result) =>
        set((state) => ({
            voiceGameResult: { ...state.voiceGameResult, ...result },
            isVoiceGameResultSet: true,
        })),
    resetVoiceGameResult: () =>
        set({
            voiceGameResult: {
                planId: 0,
                score: 0,
                filename: '',
                script: '',
            },
            isVoiceGameResultSet: false,
        }),
}));

// 밸런스 게임
const useBalanceGameStore = create((set) => ({
    // 전역 변수 및 함수들
}));

// 타이핑 게임
const useTypingGameStore = create((set) => ({
    typingGameResult: {
        planId: 0,
        gameType: 3,
        score: 0,
    },
    isTypingGameResultSet: false,
    setTypingGameResult: (result) =>
        set((state) => ({
            typingGameResult: { ...state.typingGameResult, ...result },
            isTypingGameResultSet: true,
        })),
    resetTypingGameResult: () =>
        set({
            typingGameResult: {
                planId: 0,
                gameType: 3,
                score: 0,
            },
            isTypingGameResultSet: false,
        }),
}));

// 기억력 게임

const useGameStore = () => {
    const voiceGameState = useVoiceGameStore();
    const balanceGameState = useBalanceGameStore();
    const typingGameState = useTypingGameStore();
    return { ...voiceGameState, ...balanceGameState, ...typingGameState };
};

export default useGameStore;
