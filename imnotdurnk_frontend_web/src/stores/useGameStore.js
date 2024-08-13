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
    balanceGameResult: {
        planId: 0,
        gameType: 2,
        score: 0,
    },
    isBalanceGameResultSet: false,
    setBalanceGameResult: (result) =>
        set((state) => ({
            balanceGameResult: { ...state.balanceGameResult, ...result },
            isBalanceGameResultSet: true,
        })),
    resetBalanceGameResult: () =>
        set({
            balanceGameResult: {
                planId: 0,
                gameType: 2,
                score: 0,
            },
            isBalanceGameResultSet: false,
        }),
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
const useMemorizeGameStore = create((set) => ({
    memorizeGameResult: {
        planId: 0,
        gameType: 4,
        score: 0,
    },
    isMemorizeGameResultSet: false,
    setMemorizeGameResult: (result) =>
        set((state) => ({
            memorizeGameResult: { ...state.memorizeGameResult, ...result },
            isMemorizeGameResultSet: true,
        })),
    resetMemorizeGameResult: () =>
        set({
            memorizeGameResult: {
                planId: 0,
                gameType: 4,
                score: 0,
            },
            isMemorizeGameResultSet: false,
        }),
}));

const useGameStore = () => {
    const voiceGameState = useVoiceGameStore();
    const balanceGameState = useBalanceGameStore();
    const typingGameState = useTypingGameStore();
    const memorizeGameState = useMemorizeGameStore();
    return {
        ...voiceGameState,
        ...balanceGameState,
        ...typingGameState,
        ...memorizeGameState,
    };
};

export default useGameStore;
