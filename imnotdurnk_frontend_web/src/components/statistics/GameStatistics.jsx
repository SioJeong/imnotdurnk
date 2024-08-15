import SelectButton from '@/components/_button/SelectButton';
import { icons } from '@/shared/constants/icons';
import { useEffect, useState } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { styled } from 'styled-components';
import { getGameStaticsticsData } from '../../services/statistics';
import { ToastError } from '../_common/alert';
const GameStatistics = ({ formattedDate }) => {
    //첫번째 게임 종류 고르는 탭
    const [activeGameTypeIndex, setActiveGameTypeIndex] = useState(0);
    const tabGameTypeList = [0, 1, 2, 3];
    const handleGameTypeClick = (index) => {
        setActiveGameTypeIndex(index);
    };

    const iconNames = ['voice', 'balance', 'keyboard', 'memorize'];

    //두번째 통계 월,년 고르는 탭
    const [activeIndex, setActiveIndex] = useState(0);
    const tabContentsList = [
        { text: 'Month', comment1: '이번 달', comment2: '은 ' },
        { text: 'Year', comment1: '올해', comment2: '는 ' },
    ];
    //두번째 탭 이동
    const handleButtonClick = (index) => {
        setActiveIndex(index);
    };
    //게임 4개의 데이터 결과 담긴 배열
    const [gameStatisticsList, setGameStatisticsList] = useState([
        {
            totalAverage: 0,
            monthAverage: 0,
            lowerCountThanMonthAvg: 0,
            lowerCountThanYearAvg: 0,
        },
        {
            totalAverage: 0,
            monthAverage: 0,
            lowerCountThanMonthAvg: 0,
            lowerCountThanYearAvg: 0,
        },
        {
            totalAverage: 0,
            monthAverage: 0,
            lowerCountThanMonthAvg: 0,
            lowerCountThanYearAvg: 0,
        },
        {
            totalAverage: 0,
            monthAverage: 0,
            lowerCountThanMonthAvg: 0,
            lowerCountThanYearAvg: 0,
        },
    ]);
    //Pie Chart에서 필요한 데이터 형식으로 변경한 게임 데이터
    const [monthAverageForPieChart, setMonthAverageForPieChart] = useState([]);
    const [totalAverageForPieChart, setTotalAverageForPieChart] = useState([]);
    const [compareScoreList, setCompareScoreList] = useState([]); //전체 vs 이번달 값 배열

    const convertGameStatisticsResult = (gameData) => {
        const monthDataForChartTmpList = [];
        const totalDataForChartTmpList = [];
        const compareScoreForChartTmpList = [];
        const convertDataResult = gameData.map((value, index) => {
            monthDataForChartTmpList.push([
                {
                    name: '이번 달 점수 평균',
                    value: value.monthAverage,
                },
                {
                    name: 'Remaining',
                    value: 100 - value.monthAverage,
                },
            ]);
            totalDataForChartTmpList.push([
                {
                    name: '전체 점수 평균',
                    value: value.totalAverage,
                },
                {
                    name: 'Remaining',
                    value: 100 - value.totalAverage,
                },
            ]);
            if (value.totalAverage === value.monthAverage) {
                compareScoreForChartTmpList.push('과 같습니다.');
            } else if (value.totalAverage < value.monthAverage) {
                compareScoreForChartTmpList.push('보다 높습니다.');
            } else {
                compareScoreForChartTmpList.push('보다 낮습니다.');
            }
        });
        setMonthAverageForPieChart(monthDataForChartTmpList);
        setTotalAverageForPieChart(totalDataForChartTmpList);
        setCompareScoreList(compareScoreForChartTmpList);
    };

    const CustomLabel = ({ cx, cy, value, name }) => {
        // 라벨이 '이번 달 점수 평균'인 경우에만 표시
        if (name === '이번 달 점수 평균' || name === '전체 점수 평균') {
            return (
                <text
                    x={cx}
                    y={cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={18}
                    fill="black"
                >
                    <tspan x={cx} dy="-0.6em">
                        {name}
                    </tspan>
                    <tspan x={cx} dy="1.2em">
                        {value.toFixed(2)}점
                    </tspan>
                </text>
            );
        }
        return null;
    };

    useEffect(() => {
        const fetchGameStatistics = async () => {
            try {
                const results = [];

                const getGameStaticsticsResult1 = await getGameStaticsticsData(
                    formattedDate,
                    1,
                );
                if (getGameStaticsticsResult1.isSuccess) {
                    results.push(getGameStaticsticsResult1.data.data);
                }
                const getGameStaticsticsResult2 = await getGameStaticsticsData(
                    formattedDate,
                    2,
                );
                if (getGameStaticsticsResult2.isSuccess) {
                    results.push(getGameStaticsticsResult2.data.data);
                }
                const getGameStaticsticsResult3 = await getGameStaticsticsData(
                    formattedDate,
                    3,
                );
                if (getGameStaticsticsResult3.isSuccess) {
                    results.push(getGameStaticsticsResult3.data.data);
                }
                const getGameStaticsticsResult4 = await getGameStaticsticsData(
                    formattedDate,
                    4,
                );
                if (getGameStaticsticsResult4.isSuccess) {
                    results.push(getGameStaticsticsResult4.data.data);
                }
                setGameStatisticsList(results);
                convertGameStatisticsResult(results);
            } catch (error) {
                ToastError('데이터를 불러오는데 실패했습니다.', true);
                console.error('Error fetching user data:', error);
            }
        };
        fetchGameStatistics();
    }, []);

    return (
        <StyledContainer>
            <GameListBox>
                {tabGameTypeList.map((item, index) => (
                    <Game
                        key={index}
                        $isClicked={activeGameTypeIndex === index}
                        onClick={() => handleGameTypeClick(index)}
                    >
                        <StyledIcon
                            src={icons[iconNames[index]]}
                            alt={`${iconNames[index]} `}
                            isActive={activeGameTypeIndex === index}
                        />
                    </Game>
                ))}
            </GameListBox>
            <StatisticsVisualization>
                <MainTitle>점수 통계</MainTitle>
                <SubTitle>
                    이번 달은 점수 전체 평균
                    <Highlight>
                        {compareScoreList[activeGameTypeIndex]}
                    </Highlight>
                </SubTitle>
                <Graph>
                    <ResponsiveContainer width={200} height={150}>
                        <PieChart width={300} height={300}>
                            <Pie
                                data={
                                    totalAverageForPieChart[activeGameTypeIndex]
                                }
                                innerRadius={80}
                                outerRadius={90}
                                fill={'var(--color-white1)'}
                                dataKey="value"
                                label={<CustomLabel />}
                            >
                                <Cell fill={'var(--color-red)'} />
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                    <ResponsiveContainer width={200} height={150}>
                        <PieChart width={300} height={300}>
                            <Pie
                                data={
                                    monthAverageForPieChart[activeGameTypeIndex]
                                }
                                innerRadius={80}
                                outerRadius={90}
                                fill={'var(--color-white1)'}
                                dataKey="value"
                                label={<CustomLabel />}
                            >
                                <Cell fill={'var(--color-green2)'} />
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </Graph>
            </StatisticsVisualization>
            <StatisticsText>
                <ButtonBox>
                    {tabContentsList.map((item, index) => (
                        <SelectButton
                            key={index}
                            text={item.text}
                            isRed={activeIndex === index} // 활성화된 버튼에만 isRed를 true로 설정
                            onClick={() => handleButtonClick(index)}
                        />
                    ))}
                </ButtonBox>
                <Analysis>
                    <Highlight>
                        {tabContentsList[activeIndex].comment1}
                    </Highlight>
                    {tabContentsList[activeIndex].comment2}
                    <Highlight>
                        {gameStatisticsList !== undefined && activeIndex === 0
                            ? gameStatisticsList[activeGameTypeIndex]
                                  .lowerCountThanMonthAvg
                            : gameStatisticsList[activeGameTypeIndex]
                                  .lowerCountThanYearAvg}
                        일
                    </Highlight>
                    이 <br /> 평균보다 낮아요. <br />
                    <br />
                    <Highlight>
                        {' '}
                        {gameStatisticsList !== undefined && activeIndex === 0
                            ? gameStatisticsList[activeGameTypeIndex]
                                  .lowerCountThanMonthAvg
                            : gameStatisticsList[activeGameTypeIndex]
                                  .lowerCountThanYearAvg}
                        일
                    </Highlight>{' '}
                    과음하셨나봐요!
                </Analysis>
            </StatisticsText>
        </StyledContainer>
    );
};

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.4286rem;
    align-self: stretch;
`;
const GameListBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2.1429rem;
    align-self: stretch;
`;

const StatisticsVisualization = styled.div`
    display: flex;
    padding: 1.7143rem 2rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.9286rem;
    align-self: stretch;
    border-radius: 20px;
    background: var(--color-white2, #f7f7ec);
`;
const MainTitle = styled.h2`
    height: 1.7143rem;
    align-self: stretch;
    color: var(--color-green3, #252f2c);
    font-size: var(--font-title-h2);
`;
const SubTitle = styled.p`
    height: 1.7143rem;
    align-self: stretch;
    color: var(--color-green3, #252f2c);

    font-size: var(--font-title-h3);
`;
const StatisticsText = styled.div`
    display: flex;
    padding: 1.7143rem 2rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1.7143rem;
    align-self: stretch;
    border-radius: 20.0004px;
    background: var(--color-green2, #465a54);
`;
const ButtonBox = styled.div`
    display: flex;
    align-items: center;
    gap: 1.2143rem;
    align-self: stretch;
`;
const Analysis = styled.div`
    align-self: stretch;
    color: var(--color-white1, #fff);

    font-size: var(--font-body-h2);
`;

const Highlight = styled.span`
    color: var(--color-red);
`;
const Graph = styled.div`
    display: flex;
    justify-content: center; /* 수평 중앙 정렬 */
    align-items: center;
    gap: 0.7143rem;
    flex: 1 0 0;
    align-self: stretch;
`;

const Game = styled.div`
    display: flex;
    justify-content: center; /* 수평 중앙 정렬 */
    align-items: center;
    width: 4.1429rem;
    height: 4.1429rem;
    flex-shrink: 0;
    border-radius: 50%;
    // background-color: var(--color-green2, #465a54);
    background-color: ${(props) =>
        props.$isClicked
            ? 'var(--color-green2, #465a54)'
            : 'var(--color-white2, #f7f7ec)'};
    cursor: pointer;
`;
const StyledIcon = styled.img`
    filter: ${({ isActive }) =>
        isActive ? 'brightness(0) invert(1)' : 'none'};
`;
export default GameStatistics;
