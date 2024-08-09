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

// 밸런스 게임
const useBalanceGameStore = create((set) => ({
    // 전역 변수 및 함수들
}));

// 타이핑 게임

// 기억력 게임

const useGameStore = () => {
    const voiceGameState = useVoiceGameStore();
    const balanceGameState = useBalanceGameStore();
    return { ...voiceGameState, ...balanceGameState };
};

export default useGameStore;
