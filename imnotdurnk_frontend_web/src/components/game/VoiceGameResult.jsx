import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../stores/useAuthStore';
import useGameStore from '../../stores/useGameStore';
import useNavigationStore from '../../stores/useNavigationStore';
import Button from '../_button/Button';
import { InfoConfirmModal, ToastSuccess, ToastWarning } from '../_common/alert';
import * as St from './VoiceGameResult.style';

const VoiceGameResult = () => {
    const navigate = useNavigate();
    const setNavigation = useNavigationStore((state) => state.setNavigation);

    const { voiceGameResult } = useGameStore();
    const { accessToken } = useAuthStore();

    useEffect(() => {
        setNavigation({
            isVisible: true,
            icon1: { iconname: 'backarrow', path: '/game/voicegame' },
            title: '게임 결과',
            icon2: { iconname: 'empty' },
        });
    }, []);

    // TODO: Alert 위치 UI 나오면 다시 체크
    const handleSubmit = () => {
        if (!accessToken) {
            ToastWarning('로그인이 필요합니다.');
            navigate('/account');
            return;
        }
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
        <St.ResultContainer>
            <h3>당신의 발음 평가 점수는 {voiceGameResult.score}점 입니다.</h3>
            <St.ButtonDiv>
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
            </St.ButtonDiv>
        </St.ResultContainer>
    );
};

export default VoiceGameResult;
