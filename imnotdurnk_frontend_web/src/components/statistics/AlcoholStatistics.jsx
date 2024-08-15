import SelectButton from '@/components/_button/SelectButton';
import { useEffect, useState } from 'react';
import { Bar, BarChart, ResponsiveContainer, XAxis } from 'recharts';
import { styled } from 'styled-components';
import { getAlcoholStaticsticsData } from '../../services/statistics';

import { useNavigate } from 'react-router-dom';
const AlcoholStatistics = ({ today, formattedDate }) => {
    //날짜 관련 변수- 오늘 통계 불러오기 위한 formattedDate용, 음주량 계산용

    //두번째 통계 탭
    const [activeIndex, setActiveIndex] = useState(2);
    const tabContentsList = [
        { text: 'Day', comment: '이번달 일별 평균 음주량은' },
        { text: 'Month', comment: '올해 월별 평균 음주량은' },
        { text: 'Year', comment: '올해 총 음주량은' },
    ];
    //탭 이동
    const handleButtonClick = (index) => {
        setActiveIndex(index);
    };

    const [alcoholStatistics, setAlcoholStatistics] = useState({
        monthTotal: {
            sojuAmount: 0,
            beerAmount: 0,
        },
        yearTotal: {
            sojuAmount: 0,
            beerAmount: 0,
        },
        planForMonths: [],
    });
    const [avgData, setAvgData] = useState([
        { soju: 0, beer: 0 },
        { soju: 0, beer: 0 },
        { soju: 0, beer: 0 },
    ]);
    //두번째 통계 계산하는 함수
    const calculateAlcoholStatistics = (alcoholData) => {
        const updatedData = [...avgData];
        const roundToFirstDecimalPlace = (number) => {
            return Math.round(number * 10) / 10;
        };

        // 두 번째 요소만 수정
        updatedData[0] = {
            soju: roundToFirstDecimalPlace(
                alcoholData.monthTotal.sojuAmount / 8 / today.getDate(),
            ),

            beer: roundToFirstDecimalPlace(
                alcoholData.monthTotal.beerAmount / 500 / today.getDate(),
            ),
        };
        updatedData[1] = {
            soju: roundToFirstDecimalPlace(
                alcoholData.yearTotal.sojuAmount / 8 / today.getDate(),
            ),

            beer: roundToFirstDecimalPlace(
                alcoholData.yearTotal.beerAmount / 500 / today.getDate(),
            ),
        };
        updatedData[2] = {
            soju: roundToFirstDecimalPlace(
                alcoholData.yearTotal.sojuAmount / 8,
            ),

            beer: roundToFirstDecimalPlace(
                alcoholData.yearTotal.beerAmount / 500,
            ),
        };

        // 업데이트된 배열로 상태를 설정
        setAvgData(updatedData);
    };

    const navigate = useNavigate();
    //첫번째 통계 얼마나 더 마셨는지 나타내는 변수
    const [differenceOfSchedule, setDifferenceOfSchedule] = useState(0);
    //첫번째 통계의 월 표시 변경하는 함수 ex. 08->8월
    const convertFormatOfMonth = (planForMonths) => {
        return planForMonths.map((item) => ({
            ...item,
            month: `${item.month}월`, // month 값 뒤에 '월'을 붙임
        }));
    };
    const [formattedPlanForMonths, setFormattedPlanForMonths] = useState([]);

    useEffect(() => {
        const fetchAlcoholStatistics = async () => {
            try {
                const getStatisticsResult =
                    await getAlcoholStaticsticsData(formattedDate);

                if (getStatisticsResult.isSuccess) {
                    calculateAlcoholStatistics(getStatisticsResult.data);
                    const updatedData = convertFormatOfMonth(
                        getStatisticsResult.data.planForMonths,
                    );
                    setAlcoholStatistics(getStatisticsResult.data);
                    setFormattedPlanForMonths(updatedData);
                    setDifferenceOfSchedule(
                        getStatisticsResult?.data.planForMonths[11].count -
                            getStatisticsResult.data.planForMonths[10].count,
                    );
                }
                console.log('앍콜0', alcoholStatistics.planForMonths);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchAlcoholStatistics();
    }, []);

    return (
        <StatisticsBox>
            <StatisticsVisualization>
                <MainTitle>월별 음주 통계</MainTitle>
                {alcoholStatistics.planForMonths.length === 0 ? (
                    <SubTitle>아직 등록된 음주기록이 없습니다.</SubTitle>
                ) : (
                    <SubTitle>
                        지난 달보다 이번 달{' '}
                        <Highlight>
                            {Math.abs(differenceOfSchedule)}번{' '}
                        </Highlight>
                        {differenceOfSchedule < 0 ? ' 더 적게' : ' 더 많이 '}{' '}
                        마셨습니다.
                    </SubTitle>
                )}

                <Graph>
                    {alcoholStatistics.planForMonths.length === 0 ? (
                        <p
                            onClick={() => {
                                navigate('/calendar');
                            }}
                        >
                            음주 기록 등록하러 가기
                        </p>
                    ) : (
                        <ResponsiveContainer width="100%" height={215}>
                            <BarChart
                                width={300}
                                height={150}
                                data={alcoholStatistics.planForMonths}
                                margin={{
                                    top: 25,
                                    right: 15,
                                    left: 15,
                                    bottom: 5,
                                }}
                                barSize={20}
                            >
                                <XAxis
                                    dataKey="month"
                                    scale="point"
                                    tick={{
                                        fontSize: 8,
                                    }}
                                    label={{
                                        value: '월', // x축 레이블 텍스트
                                        position: 'insideBottom', // Set position to 'insideBottom'
                                        offset: -2, // Adjust offset to move label down
                                        fontSize: 12, // Optional: Adjust font size for better visibility
                                    }}
                                />
                                <Bar
                                    dataKey="count"
                                    fill="var(--color-red, #f7f7ec)"
                                    background={{ fill: 'var(--color-white2)' }}
                                    label={{ position: 'top', fontSize: '11' }}
                                ></Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    )}
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
                    {tabContentsList[activeIndex].comment}
                    <br />
                    소주<Highlight> {avgData[activeIndex].soju}</Highlight>병,
                    맥주
                    <Highlight> {avgData[activeIndex].beer}</Highlight>
                    병입니다.
                </Analysis>
            </StatisticsText>
        </StatisticsBox>
    );
};

const StatisticsBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.4286rem;
    align-self: stretch;
`;
const StatisticsVisualization = styled.div`
    display: flex;
    padding: 1.7143rem 2rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.4286rem;
    align-self: stretch;
    border-radius: 20.0004px;
    background: var(--color-white2, #f7f7ec);
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
const Graph = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 49.3571rem;
    width: 100%;
    gap: 0.7143rem;
    flex: 1 0 0;
    align-self: stretch;
`;
const ButtonBox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;
`;
const Analysis = styled.div`
    height: 3.4286rem;
    align-self: stretch;
    color: var(--color-white1, #fff);

    font-size: var(--font-body-h2);
`;
const Highlight = styled.span`
    color: var(--color-red);
`;

export default AlcoholStatistics;
