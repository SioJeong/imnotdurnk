import { styled } from 'styled-components';

const VoiceGameContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    padding: 3rem;
    border-radius: 20px;
    background-color: var(--color-white2);
`;

const Notice = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
`;

const TestText = styled.h2`
    text-align: center;
    white-space: pre-line;
`;

const LoadingBox = styled.div`
    padding: 3rem 0 1rem 0;
`;

const RecordButton = styled.button`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    cursor: pointer;
`;

const CustomAudio = styled.audio`
    &::-webkit-media-controls-panel {
        background-color: var(--color-white2);
        border-radius: 5px;
    }
`;

export {
    CustomAudio,
    LoadingBox,
    Notice,
    RecordButton,
    TestText,
    VoiceGameContainer,
};
