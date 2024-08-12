import useUserStore from '@/stores/useUserStore.js';
import { useLocation, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import Button from '../_button/Button';

const GameResult = () => {
    const { user } = useUserStore((state) => ({
        user: state.user,
    }));

    const navigate = useNavigate();
    const location = useLocation();
    const standard = 70;
    // 2. location.state 에서 파라미터 취득
    const gameName = location.state.gameName;
    const gameScore = location.state.gameScore;
    const drunkenLevelContentsList = [
        {
            image: '이미지 파일 이름',
            comment: ['점수가 몇점 이상일 때 멘트입니다.'],
        },
        {
            image: '이미지 파일 이름',
            comment: [
                '많이 취하셨군요.',
                ' 경로 탐색 기능으로 집까지 안전하게 귀가해보세요.',
            ],
        },
    ];
    const onClickGameListButton = () => {
        navigate('/');
    };
    return (
        <ResultContainer>
            <TitleContainer>
                <Title>
                    {user.name ? user.name : '00'}님의{' '}
                    {gameName ? gameName : '00'} 게임 점수는
                    <br />{' '}
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
            <StyledImage>
                이미지 들어 갈 곳
                {gameScore && gameScore >= standard
                    ? drunkenLevelContentsList[0].imgage
                    : drunkenLevelContentsList[1].image}
            </StyledImage>
            <ButtonBox>
                <Button text="게임 기록 저장하기" size="big" isRed={false} />
                <Button
                    text="게임 목록으로 돌아가기"
                    size="big"
                    isRed={true}
                    onClick={onClickGameListButton}
                />
                <Button text="집가는 경로 탐색하기" size="big" isRed={false} />
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
    gap: 7px;
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

const StyledImage = styled.div`
    display: flex;
    height: 199px;
    justify-content: center;
    align-items: center;
    align-self: stretch;
`;
const ButtonBox = styled.div`
    display: flex;
    height: 129px;
    padding: 0px 14px;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    align-self: stretch;
`;
const Highlight = styled.span`
    color: var(--color-red);
    font-size: var(--font-body-h2);
`;

export default GameResult;
