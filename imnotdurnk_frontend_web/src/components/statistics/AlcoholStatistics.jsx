import SelectButton from '@/components/_button/SelectButton';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';

import { Bar, BarChart, ResponsiveContainer, XAxis } from 'recharts';

const AlcoholStatistics = ({ avgData, planForMonths }) => {
    const [activeIndex, setActiveIndex] = useState(2);
    const tabContentsList = [
        { text: 'Day', comment: '이번달 일별 평균 음주량은' },
        { text: 'Month', comment: '올해 월별 평균 음주량은' },
        { text: 'Year', comment: '올해 총 음주량은' },
    ];

    const handleButtonClick = (index) => {
        setActiveIndex(index);
    };
    useEffect(() => {
        console.log(planForMonths, 'useEf');
    }, [planForMonths]);

    return (
        <StatisticsBox>
            <StatisticsVisualization>
                <MainTitle>월별 음주 통계</MainTitle>
                <SubTitle>지난 달보다 이번달 7번 더 많이 마셨습니다.</SubTitle>
                <Graph>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            width={500}
                            height={300}
                            data={planForMonths}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                            barSize={20}
                        >
                            <XAxis
                                dataKey={planForMonths.month}
                                scale="point"
                                padding={{ left: 10, right: 10 }}
                            />
                            <Bar
                                dataKey={planForMonths.count}
                                fill="#8884d8"
                                background={{ fill: '#eee' }}
                            />
                        </BarChart>
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
                    {tabContentsList[activeIndex].comment}
                    <br />
                    소주 {avgData[activeIndex].soju}병, 맥주
                    {avgData[activeIndex].beer} 병입니다.
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
    gap: 0.9286rem;
    align-self: stretch;
    border-radius: 1.4286rem;
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
    border-radius: 1.4286rem;
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
    gap: 0.7143rem;
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
    height: 3.4286rem;
    align-self: stretch;
    color: var(--color-white1, #fff);

    font-size: var(--font-body-h2);
`;
export default AlcoholStatistics;
