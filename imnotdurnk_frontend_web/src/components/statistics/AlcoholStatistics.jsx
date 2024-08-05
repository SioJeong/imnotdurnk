import SelectButton from '@/components/_button/SelectButton';
import { useState } from 'react';
import { styled } from 'styled-components';

const AlcoholStatistics = () => {
    const [activeIndex, setActiveIndex] = useState(2);
    const tabContentsList = [
        { text: 'Day', unit: '일' },
        { text: 'Month', unit: '월' },
        { text: 'Year', unit: '연' },
    ];
    const handleButtonClick = (index) => {
        setActiveIndex(index);
    };
    return (
        <StatisticsBox>
            <StatisticsVisualization>
                <MainTitle>월별 음주 통계</MainTitle>
                <SubTitle>지난 달보다 이번달 7번 더 많이 마셨습니다.</SubTitle>
                <Graph></Graph>
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
                    지난 1년간 {tabContentsList[activeIndex].unit}별 평균
                    음주량은 <br />
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
