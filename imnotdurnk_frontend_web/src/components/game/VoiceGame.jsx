import { useQuery } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RecordRTC from 'recordrtc';
import { getTestSentence, sendVoiceRecord } from '../../services/game';
import useGameStore from '../../stores/useGameStore';
import { ToastSuccess } from '../_common/alert';
import VoiceSvgAnimation from '../_common/VoiceSvgAnimation';
import Button from './../_button/Button';
import * as St from './VoiceGame.style';

import useUserStore from '@/stores/useUserStore.js';
const VoiceGame = () => {
    const { user } = useUserStore((state) => ({
        user: state.user,
    }));
    const navigate = useNavigate();
    const { setVoiceGameResult } = useGameStore();

    const [isRecording, setIsRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState(null);
    const [recordingStatus, setRecordingStatus] =
        useState('버튼을 눌러 녹음을 시작해주세요.');

    const audioRef = useRef();
    const recorderRef = useRef(null);
    const streamRef = useRef(null);

    const {
        data: testSentence,
        error,
        isError,
        isLoading,
    } = useQuery({
        queryKey: ['testSentence'],
        queryFn: () => getTestSentence(),
        staleTime: 0, // 컴포넌트 마운트 할 때마다 새로 실행
        cacheTime: 0, // 캐시 비활성화
    });

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
                    desiredSampRate: 16000,
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
                console.error('미디어 장치 접속 중 오류 발생: ', error);
                setIsRecording(false);
                setRecordingStatus('버튼을 눌러 녹음을 시작해주세요.');
            }
        }
    };

    const handleSubmit = async () => {
        if (audioBlob) {
            const formData = new FormData();
            formData.append('file', audioBlob, 'recording.wav');
            formData.append('script', testSentence);
            try {
                ToastSuccess('음성 분석 중입니다.');

                const dataResult = await sendVoiceRecord({ formData });
                if (dataResult) {
                    console.log('dataResult ---- 전송 받은 결과', dataResult);
                    setVoiceGameResult(dataResult);
                    navigate('/game/game-result', {
                        state: {
                            gameName: '발음',
                            gameScore: dataResult.score,
                        },
                    });
                    // navigate('/game/voicegame/result');
                }
            } catch (error) {
                console.error('음성 파일 제출 오류: ', error);
            }
        } else {
            console.log('전송할 오디오 파일이 없습니다.');
        }
    };

    return (
        <St.VoiceGameContainer>
            <St.Notice>
                <h2>아래의 글을 따라 읽어주세요!</h2>
                <h4>
                    {user.name !== '' ? user.name : '손'}님의 혀가 꼬였는지
                    저희가 들어볼게요.
                </h4>
            </St.Notice>
            {isLoading ? (
                <h3>문장을 가져오는 중입니다.</h3>
            ) : isError ? (
                <h3>Error: {error.message}</h3>
            ) : (
                <St.TestText>{testSentence}</St.TestText>
            )}
            <St.RecordButton onClick={handleToggleRecording}>
                <VoiceSvgAnimation $isRecording={isRecording} />
                <h3>{recordingStatus}</h3>
            </St.RecordButton>
            <St.CustomAudio ref={audioRef} controls />
            <Button text="제출하기" isRed={true} onClick={handleSubmit} />
        </St.VoiceGameContainer>
    );
};

export default VoiceGame;
