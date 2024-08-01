import SelectButton from '@/components/_button/SelectButton';
import { styled } from 'styled-components';
const GameStatistics = () => {
    return (
        <StyledContainer>
            <GameListBox>
                <Game />
                <Game />
                <Game />
                <Game />
            </GameListBox>
            <StatisticsVisualization>
                <MainTitle>점수 통계</MainTitle>
                <SubTitle>이번 달은 점수 전체 평균보다 높습니다.</SubTitle>
                <Graph></Graph>
            </StatisticsVisualization>
            <StatisticsText>
                <ButtonBox>
                    <SelectButton text="Month" isRed="true" />
                    <SelectButton text="Year" isRed="true" />
                </ButtonBox>
                <Analysis>
                    지난 1년간 일별 평균 음주량은 <br />
                    소주 0.4병 맥주 0.3병입니다.
                </Analysis>
            </StatisticsText>
        </StyledContainer>
    );
};

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    align-self: stretch;
`;
const GameListBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;
    align-self: stretch;
`;
const Game = styled.button`
    width: 58px;
    height: 58px;
    flex-shrink: 0;
    border-radius: 50%;
    background: var(----color-white2, #f7f7ec);

    //background: var(--color-green2, #465a54);
`;
const StatisticsVisualization = styled.div`
    display: flex;
    padding: 24px 28px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 13px;
    align-self: stretch;
    border-radius: 20px;
    background: var(----color-white2, #f7f7ec);
`;
const MainTitle = styled.h2`
    height: 24px;
    align-self: stretch;
    color: var(--color-green3, #252f2c);
    font-size: var(--font-title-h2);
`;
const SubTitle = styled.p`
    height: 24px;
    align-self: stretch;
    color: var(--color-green3, #252f2c);

    font-size: var(--font-title-h3);
`;
const StatisticsText = styled.div`
    display: flex;
    padding: 24px 28px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 24px;
    align-self: stretch;
    border-radius: 20px;
    background: var(----color-green2, #465a54);
`;
const ButtonBox = styled.div`
    display: flex;
    align-items: center;
    gap: 17px;
    align-self: stretch;
`;
const Analysis = styled.div`
    height: 48px;
    align-self: stretch;
    color: var(----color-white1, #fff);

    font-size: var(--font-body-h2);
`;
const Graph = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex: 1 0 0;
    align-self: stretch;
    border: 1px solid pink;
`;
export default GameStatistics;
