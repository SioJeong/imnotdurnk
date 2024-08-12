import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import useGameStore from '../../stores/useGameStore';
import useNavigationStore from '../../stores/useNavigationStore';
import Button from '../_button/Button';
import { InfoConfirmModal, ToastSuccess, ToastWarning } from '../_common/alert';

const VoiceGameResult = () => {
    const navigate = useNavigate();
    const setNavigation = useNavigationStore((state) => state.setNavigation);

    const { voiceGameResult } = useGameStore();

    useEffect(() => {
        setNavigation({
            isVisible: true,
            icon1: { iconname: 'backarrow', path: '/game/voicegame' },
            title: '게임 결과',
            icon2: { iconname: 'empty' },
        });
    }, []);

    // TODO: 로그인 안 한 경우 로그인 페이지로 바로 라우팅 (ToastWarning 함께)
    const handleSubmit = () => {
        InfoConfirmModal(
            '오늘 등록한 일정이 있나요?',
            '예',
            '아니오',
            () => {
                ToastSuccess('오늘의 일정 리스트로 이동합니다.');
                navigate('/game/voicegame/result/add-to-plan');
            },
            () => {
                InfoConfirmModal(
                    '지금 술을 드시고 계신가요?',
                    '예',
                    '아니오',
                    () => {
                        InfoConfirmModal(
                            `게임 기록을 저장하려면 일정이 필요합니다. <br/> 
                            새로운 일정을 생성할까요?`,
                            '예',
                            '아니오',
                            () => {
                                ToastSuccess('일정 등록 페이지로');
                            },
                            () => {
                                ToastWarning(
                                    '기록을 저장하려면 일정이 필요합니다.',
                                );
                            },
                            // '게임 기록이 등록 되었습니다.',
                        );
                    },
                    () => {
                        ToastWarning('술을 마신 경우에만 기록이 저장됩니다.');
                    },
                    // '게임 기록이 등록 되었습니다.',
                );
            },
            // '게임 기록이 등록 되었습니다.',
        );
    };

    const goToGameList = () => {
        // TODO: 저장하지 않음을 알리는 API 요청 필요 (파일 명과 함께)
        navigate('/game');
    };

    return (
        <ResultContainer>
            <h3>당신의 발음 평가 점수는 {voiceGameResult.score}점 입니다.</h3>
            <ButtonDiv>
                <Button
                    text="게임 기록 저장하기"
                    isRed={false}
                    border={true}
                    onClick={handleSubmit}
                />
                <Button
                    text="게임 목록으로"
                    isRed={true}
                    onClick={goToGameList}
                />
            </ButtonDiv>
        </ResultContainer>
    );
};

export default VoiceGameResult;

const ResultContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3rem;
`;

const ButtonDiv = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;

    width: 100%;
`;
