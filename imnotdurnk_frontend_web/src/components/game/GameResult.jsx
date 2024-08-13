import { icons } from '@/shared/constants/icons';
import useUserStore from '@/stores/useUserStore.js';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import useAuthStore from '../../stores/useAuthStore';
import useNavigationStore from '../../stores/useNavigationStore';
import Button from '../_button/Button';
import { InfoConfirmModal, ToastSuccess, ToastWarning } from '../_common/alert';
const GameResult = () => {
    const { user } = useUserStore((state) => ({
        user: state.user,
    }));
    const { accessToken } = useAuthStore();

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
                                navigate('/calendar/create-plan');
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
    const onClickGameListButton = () => {
        // TODO: 저장하지 않음을 알리는 API 요청 필요 (파일 명과 함께)
        navigate('/game');
    };

    return (
        <ResultContainer>
            <TitleContainer>
                <Title>
                    {user.name !== '' ? user.name : '손'}님의
                    <br />
                    {gameName ? gameName : '00'} 게임 점수는
                    <Highlight>
                        {gameScore ? Math.floor(gameScore) : 0}
                    </Highlight>{' '}
                    점 입니다!
                </Title>
                <SubTitle>
                    {gameScore && gameScore >= standard
                        ? drunkenLevelContentsList[0].comment
                        : drunkenLevelContentsList[1].comment}
                </SubTitle>
            </TitleContainer>
            <ImageWrapper>
                <StyledImage
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
            </ImageWrapper>
            <ButtonBox>
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
            </ButtonBox>
        </ResultContainer>
    );
};

const ResultContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-items: flex-start;
    gap: 1.9857rem;

    padding: 1.8571rem 1.7143rem;
    width: 23.5rem;
    border-radius: 20px;
    background: var(--color-white2, #f7f7ec);
`;
const TitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
`;
const Title = styled.h2`
    text-align: center;
`;
const SubTitle = styled.p`
    align-self: stretch;
    color: var(--color-green2, #465a54);
    text-align: center;
    font-size: var(--font-body-h3);
`;
const ImageWrapper = styled.div`
    display: flex;
    height: 14.2143rem;
    justify-content: center;
    align-items: center;
    align-self: stretch;
`;
const StyledImage = styled.img``;
const ButtonBox = styled.div`
    display: flex;
    height: 9.2143rem;
    padding: 0rem 1rem;
    flex-direction: column;
    align-items: center;
    gap: 0.7143rem;
    align-self: stretch;
`;
const Highlight = styled.span`
    color: var(--color-red);
    font-size: var(--font-body-h2);
`;

export default GameResult;
