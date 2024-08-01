import SelectButton from '@/components/_button/SelectButton';
import { styled } from 'styled-components';

const AlcoholStatistics = () => {
    return (
        <StatisticsBox>
            <StatisticsVisualization>
                <MainTitle>월별 음주 통계</MainTitle>
                <SubTitle>지난 달보다 이번달 7번 더 많이 마셨습니다.</SubTitle>
                <Graph></Graph>
            </StatisticsVisualization>
            <StatisticsText>
                <ButtonBox>
                    <SelectButton text="Day" isRed="true" />
                    <SelectButton text="Month" isRed="true" />
                    <SelectButton text="Year" isRed="true" />
                </ButtonBox>
                <Analysis>
                    지난 1년간 일별 평균 음주량은 <br />
                    소주 0.4병 맥주 0.3병입니다.
                </Analysis>
            </StatisticsText>
        </StatisticsBox>
    );
};

const StatisticsBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    align-self: stretch;
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
const ButtonBox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;
`;
const Analysis = styled.div`
    height: 48px;
    align-self: stretch;
    color: var(----color-white1, #fff);

    font-size: var(--font-body-h2);
`;
export default AlcoholStatistics;
