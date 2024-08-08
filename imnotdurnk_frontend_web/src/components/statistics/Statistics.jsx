import ToggleButton from '@/components/_button/ToggleButton';
import { getStaticsticsData } from '@/services/statistics';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import AlcoholStatistics from './AlcoholStatistics';
import GameStatistics from './GameStatistics';
const Statistics = () => {
    const [isFirstSelected, setIsFirstSelected] = useState(true);
    const [inputValues, setInputValues] = useState({
        yearTotal: {
            sojuAmount: 0,
            beerAmount: 0,
        },
        monthTotal: {
            sojuAmount: 0,
            beerAmount: 0,
        },
        planForMonth: [],
    });
    const changeFirstToggle = () => {
        setIsFirstSelected(true);
    };
    const changeSecondToggle = () => {
        setIsFirstSelected(false);
    };

    const today = new Date();
    const year = today.getFullYear(); // 연도
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const date = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${date}`;

    // TODO : reactquery로 통계 데이터 불러오기
    // const { isLoading, data } = useQuery({
    //     queryKey: ['AlcoholStatistics', formattedDate],
    //     queryFn: () => getStaticsticsData(formattedDate),
    //     staleTime: 10000,
    // });

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
    const calculateAlcoholStatistics = (alcoholData) => {
        const updatedData = [...avgData];
        const roundToFirstDecimalPlace = (number) => {
            return Math.round(number * 10) / 10;
        };

        console.log(
            '일별 소주',
            roundToFirstDecimalPlace(
                alcoholData.monthTotal.sojuAmount / 8 / today.getDate(),
            ),
        );
        console.log(
            '일별 맥주',
            roundToFirstDecimalPlace(
                alcoholData.monthTotal.beerAmount / 500 / today.getDate(),
            ),
        );
        console.log(
            '월별 소주',
            roundToFirstDecimalPlace(
                alcoholData.yearTotal.sojuAmount / 8 / (today.getMonth() + 1),
            ),
        );
        console.log(
            '월별 맥주',
            roundToFirstDecimalPlace(
                alcoholData.yearTotal.beerAmount / 500 / (today.getMonth() + 1),
            ),
        );

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
        console.log(alcoholData.yearTotal, 'ddd');
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

    useEffect(() => {
        console.log('useEffect내', formattedDate);
        const fetchStatisticsData = async () => {
            try {
                console.log('useEffect내2', formattedDate);
                const getStatisticsResult =
                    await getStaticsticsData(formattedDate); // getUserProfile 함수 비동기 호출

                if (getStatisticsResult.isSuccess) {
                    // 사용자 정보를 inputValues에 업데이트
                    console.log('isSuccess', getStatisticsResult.data);
                    calculateAlcoholStatistics(getStatisticsResult.data);
                    //배열에 값넣기
                    setAlcoholStatistics((prevState) => ({
                        ...prevState,
                        planForMonths: getStatisticsResult.data.planForMonths, // 이 부분을 실제 데이터로 설정
                    }));
                }
                console.log(alcoholStatistics.planForMonths, 'ddssds');
            } catch (error) {
                console.error('통계 가져오기 중 오류 발생', error);
                // 오류 처리 로직 추가
            }
        };
        fetchStatisticsData();
    }, []);

    return (
        <Container>
            <ToggleButton
                toggle1="Alcohol"
                toggle2="Game"
                isMono={false}
                isFirstSelected={isFirstSelected}
                changeFirstToggle={changeFirstToggle}
                changeSecondToggle={changeSecondToggle}
            />
            {isFirstSelected ? (
                <AlcoholStatistics
                    planForMonths={alcoholStatistics.planForMonths}
                    avgData={avgData}
                    setAvgData={setAvgData}
                />
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
