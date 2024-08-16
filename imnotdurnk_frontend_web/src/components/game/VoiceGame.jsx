import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RecordRTC from 'recordrtc';
import { getTestSentence, sendVoiceRecord } from '../../services/game';
import useGameStore from '../../stores/useGameStore';
import { ToastWarning } from '../_common/alert';
import VoiceSvgAnimation from '../_common/VoiceSvgAnimation';
import Button from './../_button/Button';
import * as St from './VoiceGame.style';

import useUserStore from '@/stores/useUserStore.js';
import Loading from '../_common/Loading';
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
    const [isSubmitting, setIsSubmitting] = useState(false); // 음성 분석 중일 때 Loading 띄우게

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

    useEffect(() => {
        if (!isRecording && audioBlob) {
            const audioUrl = URL.createObjectURL(audioBlob);
            if (audioRef.current) {
                audioRef.current.src = audioUrl;
            }
        }
    }, [isRecording, audioBlob]);

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
                setAudioBlob(null); // 기존 녹음 파일 초기화
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
                setIsRecording(false);
                setRecordingStatus('버튼을 눌러 녹음을 시작해주세요.');
            }
        }
    };

    const handleSubmit = async () => {
        if (audioBlob) {
            setIsSubmitting(true); // 제출 시작

            const formData = new FormData();
            formData.append('file', audioBlob, 'recording.wav');
            formData.append('script', testSentence);
            try {
                const dataResult = await sendVoiceRecord({ formData });
                if (dataResult) {
                    setVoiceGameResult(dataResult);
                    navigate('/game/game-result', {
                        state: {
                            gameName: '발음',
                            gameScore: dataResult.score,
                        },
                    });
                }
            } catch (err) {
                ToastWarning('음성 파일을 다시 녹음해주세요.');
            } finally {
                setIsSubmitting(false); // 제출 완료 후 로딩 상태 해제
            }
        } else {
            ToastWarning('음성 파일을 다시 녹음해주세요.');
        }
    };

    return (
        <St.VoiceGameContainer>
            <St.Notice>
                <h2>아래의 글을 따라 읽어주세요!</h2>
                <h4>혀가 꼬였는지 저희가 들어볼게요.</h4>
            </St.Notice>
            {isLoading ? (
                <h3>문장을 가져오는 중입니다.</h3>
            ) : isError ? (
                <h3>Error: {error.message}</h3>
            ) : (
                <St.TestText>{testSentence}</St.TestText>
            )}
            {isSubmitting && (
                <St.LoadingBox>
                    <Loading text="음성 파일을 분석 중입니다!" />
                </St.LoadingBox>
            )}
            {!isSubmitting && (
                <St.RecordButton onClick={handleToggleRecording}>
                    <VoiceSvgAnimation $isRecording={isRecording} />
                    <h3>{recordingStatus}</h3>
                </St.RecordButton>
            )}
            {audioBlob && <St.CustomAudio ref={audioRef} controls />}
            <Button text="제출하기" isRed={true} onClick={handleSubmit} />
        </St.VoiceGameContainer>
    );
};

export default VoiceGame;
