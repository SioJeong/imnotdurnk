import { useRef, useState } from 'react';
import RecordRTC from 'recordrtc';
import { styled } from 'styled-components';
import { sendVoiceRecord } from '../../services/game';
import VoiceSvgAnimation from '../_common/VoiceSvgAnimation';
import Button from './../_button/Button';

const VoiceGame = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState(null);
    const [recordingStatus, setRecordingStatus] =
        useState('녹음을 시작합니다.');

    const audioRef = useRef();
    const recorderRef = useRef(null);
    const streamRef = useRef(null);

    const dataURLToBlob = (dataURL) => {
        const binary = atob(dataURL.split(',')[1]);
        const array = [];
        for (let i = 0; i < binary.length; i++) {
            array.push(binary.charCodeAt(i));
        }
        return new Blob([new Uint8Array(array)], { type: 'audio/wav' });
    };

    const handleToggleRecording = async () => {
        if (isRecording) {
            // 녹음 중이면 녹음을 멈춤
            recorderRef.current.stopRecording(() => {
                recorderRef.current.getDataURL((dataURL) => {
                    const blob = dataURLToBlob(dataURL);
                    console.log('Blob Type:', blob.type);
                    const audioUrl = URL.createObjectURL(blob);
                    audioRef.current.src = audioUrl;
                    setAudioBlob(blob);
                    setIsRecording(false);
                    setRecordingStatus('다시 녹음해 볼까요?');
                    streamRef.current
                        .getTracks()
                        .forEach((track) => track.stop());
                });
            });
        } else {
            // 녹음 중이 아니면 새로 녹음 시작
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                });
                streamRef.current = stream;
                const recorder = new RecordRTC(stream, {
                    type: 'audio',
                    mimeType: 'audio/wav',
                    recorderType: RecordRTC.StereoAudioRecorder,
                    disableLogs: true,
                });

                recorder.startRecording();
                recorderRef.current = recorder;
                setIsRecording(true);
                setRecordingStatus('녹음이 끝나면 버튼을 눌러주세요.');

                // 녹음 시작할 때 audio 요소 초기화
                if (audioRef.current) {
                    audioRef.current.src = '';
                    audioRef.current.load();
                }
            } catch (error) {
                console.error('Error accessing media devices.', error);
                setIsRecording(false);
                setRecordingStatus('녹음을 시작합니다.');
            }
        }
    };

    const handleSubmit = async () => {
        if (audioBlob) {
            const formData = new FormData();
            formData.append('file', audioBlob, 'recording.wav');
            console.log('Sending audio file:', audioBlob);

            try {
                await sendVoiceRecord({ file: formData });
                console.log('File successfully submitted');
            } catch (error) {
                console.error('Error submitting file:', error);
            }
        } else {
            console.log('No audio file to submit');
        }
    };

    return (
        <VoiceGameContainer>
            <Notice>
                <h2>아래의 글을 따라 읽어주세요!</h2>
                <h4>말술님의 혀가 꼬였는지 저희가 들어볼게요.</h4>
            </Notice>
            <TestText>
                인간의 진정한 모습은{'\n'}술에 취했을 때 드러난다.
            </TestText>
            <RecordButton onClick={handleToggleRecording}>
                <VoiceSvgAnimation $isRecording={isRecording} />
                <h3>{recordingStatus}</h3>
            </RecordButton>
            <CustomAudio ref={audioRef} controls />
            <Button text="제출하기" isRed={true} onClick={handleSubmit} />
        </VoiceGameContainer>
    );
};

export default VoiceGame;

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
