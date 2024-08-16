import { icons } from '@/shared/constants/icons';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { deleteVoiceGameResult } from '../../services/game';
import useAuthStore from '../../stores/useAuthStore';
import useGameStore from '../../stores/useGameStore';
import useNavigationStore from '../../stores/useNavigationStore';
import Button from '../_button/Button';
import { InfoConfirmModal, ToastSuccess, ToastWarning } from '../_common/alert';
import * as St from './GameResult.style';

const GameResult = () => {
    const { accessToken } = useAuthStore();
    const { voiceGameResult, isVoiceGameResultSet, resetVoiceGameResult } =
        useGameStore();

    const setNavigation = useNavigationStore((state) => state.setNavigation);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        setNavigation({
            isVisible: true,
            icon1: { iconname: 'backarrow', path: '-1' },
            title: '게임 결과',
            icon2: { iconname: 'empty' },
        });
    }, []);

    const standard = 70;

    // 2. location.state 에서 파라미터 취득
    const gameName = location.state.gameName;
    const gameScore = location.state.gameScore;

    const drunkenLevelContentsList = [
        {
            imageList: ['winkingResult'],
            comment: ['아직 안취하셨네요. 조절하는 모습 멋져요.'],
        },
        {
            imageList: ['zanyResult', 'shakingResult', 'nauseatedResult'],
            comment: [
                '많이 취하셨네요!',
                ' 경로 탐색 기능으로 집까지 안전하게 귀가해보세요.',
            ],
        },
    ];

    const handleSubmit = () => {
        if (!accessToken) {
            ToastWarning('로그인이 필요합니다.', false);
            navigate('/account');
            return;
        }
        InfoConfirmModal(
            '오늘 등록한 일정이 있나요?',
            '예',
            '아니오',
            () => {
                ToastSuccess('오늘의 일정 리스트로 이동합니다.', true, true);
                navigate('/game/game-result/add-to-plan');
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
                                ToastSuccess('일정 등록 페이지로 이동합니다.');
                                navigate('/calendar/create-plan', {
                                    state: { isFromGame: true }, // 게임 기록 가지고 일정 등록
                                });
                            },
                            () => {
                                ToastWarning(
                                    '기록을 저장하려면 일정이 필요합니다.',
                                );
                            },
                        );
                    },
                    () => {
                        ToastWarning('술을 마신 경우에만 기록이 저장됩니다.');
                    },
                );
            },
        );
    };
    const onClickGameListButton = async () => {
        // 발음 게임의 경우, DB에 저장된 임시 파일 삭제 요청 API 처리
        if (isVoiceGameResultSet) {
            const result = await deleteVoiceGameResult({
                data: voiceGameResult,
            });
            if (result) {
                resetVoiceGameResult();
            }
        }
        navigate('/game');
    };

    return (
        <St.ResultContainer>
            <St.TitleContainer>
                <St.Title>
                    {gameName ? gameName : '00'} 게임 점수는
                    <br />
                    <St.Highlight>
                        {gameScore ? Math.floor(gameScore) : 0}
                    </St.Highlight>{' '}
                    점 입니다!
                </St.Title>
                <St.SubTitle>
                    {gameScore && gameScore >= standard
                        ? drunkenLevelContentsList[0].comment
                        : drunkenLevelContentsList[1].comment}
                </St.SubTitle>
            </St.TitleContainer>
            <St.ImageWrapper>
                <img
                    src={
                        gameScore && gameScore >= standard
                            ? icons[
                                  drunkenLevelContentsList[0].imageList[
                                      Math.floor(
                                          Math.random() *
                                              drunkenLevelContentsList[0]
                                                  .imageList.length,
                                      )
                                  ]
                              ]
                            : icons[
                                  drunkenLevelContentsList[1].imageList[
                                      Math.floor(
                                          Math.random() *
                                              drunkenLevelContentsList[1]
                                                  .imageList.length,
                                      )
                                  ]
                              ]
                    }
                />
            </St.ImageWrapper>
            <St.ButtonBox>
                <Button
                    text="게임 기록 저장하기"
                    size="big"
                    isRed={false}
                    onClick={handleSubmit}
                />
                <Button
                    text="게임 목록으로"
                    size="big"
                    isRed={true}
                    onClick={onClickGameListButton}
                />
            </St.ButtonBox>
        </St.ResultContainer>
    );
};

export default GameResult;
