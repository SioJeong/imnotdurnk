import ToggleButton from '@/components/_button/ToggleButton';
import { getStaticsticsData } from '@/services/calendar';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import AlcoholStatistics from './AlcoholStatistics';
import GameStatistics from './GameStatistics';

const Statistics = () => {
    const [isFirstSelected, setIsFirstSelected] = useState(true);
    const [inputValues, setInputValues] = useState({
        lastMonthCount: 0,
        thisMonthCount: 0,
        yearTotal: {
            sojuAmount: 0,
            beerAmount: 0,
        },
        monthTotal: {
            sojuAmount: 0,
            beerAmount: 0,
        },
    });
    const changeToggle = () => {
        setIsFirstSelected(!isFirstSelected);
    };
    const today = new Date();
    const year = today.getFullYear(); // 연도
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const date = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${date}`;

    useEffect(() => {
        const fetchStatisticsData = async () => {
            try {
                const getStatisticsResult =
                    await getStaticsticsData(formattedDate); // getUserProfile 함수 비동기 호출

                if (getStatisticsResult.isSuccess) {
                    // 사용자 정보를 inputValues에 업데이트

                    console.log('통계 가져옴', getStatisticsResult.data);
                } else {
                    console.log('통계 가져오기 실패');
                    // 프로필 가져오기 실패 시 처리할 로직 추가 가능
                }
            } catch (error) {
                console.error('통계 가져오기 중 오류 발생', error);
                // 오류 처리 로직 추가
            }
        };

        fetchStatisticsData();
    });
    return (
        <Container>
            <ToggleButton
                toggle1="Alcohol"
                toggle2="Game"
                isMono={false}
                isFirstSelected={isFirstSelected}
                changeToggle={changeToggle}
            />

            {isFirstSelected ? (
                <AlcoholStatistics />
            ) : (
                <GameStatistics>아직</GameStatistics>
            )}
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    width: 332px;
    flex-direction: column;
    align-items: center;
    gap: 2.1429rem;
`;

export default Statistics;
