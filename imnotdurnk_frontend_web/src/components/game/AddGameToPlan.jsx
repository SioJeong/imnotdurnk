import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import {
    convertDateToString,
    dateStringToUrl,
} from '../../hooks/useDateTimeFormatter';
import { getDailyEventList } from '../../services/calendar';
import useNavigationStore from '../../stores/useNavigationStore';
import CalendarStatusBar from '../calendar/CalendarStatusBar';
import EventCard from '../calendar/EventCard';
import * as St from './AddGameToPlan.style';

const AddGameToPlan = () => {
    const setNavigation = useNavigationStore((state) => state.setNavigation);

    const date = dateStringToUrl(convertDateToString(new Date()));

    const {
        data: dailyEventList,
        error,
        isError,
        isLoading,
    } = useQuery({
        queryKey: ['dailyEventList', date],
        queryFn: () => getDailyEventList({ date }),
        enabled: !!date, // date 있을 때만 쿼리 실행
        keepPreviousData: true, // 새 데이터 가져오는 동안 이전 데이터 유지
    });

    useEffect(() => {
        setNavigation({
            isVisible: true,
            icon1: { iconname: 'backarrow', path: '-1' },
            title: '오늘의 일정 목록',
            icon2: { iconname: 'empty' },
        });
    }, []);

    return (
        <St.CalendarListContainer>
            <St.Notice>게임 기록을 등록할 일정을 선택해주세요!</St.Notice>
            <CalendarStatusBar />
            <St.CalendarListBox>
                {isLoading ? (
                    <St.LoadingAndErrorText>
                        일정을 불러오는 중입니다.
                    </St.LoadingAndErrorText>
                ) : isError ? (
                    <St.LoadingAndErrorText>
                        Error: {error.message}
                    </St.LoadingAndErrorText>
                ) : dailyEventList && dailyEventList.length > 0 ? (
                    dailyEventList.map((e) => (
                        <EventCard
                            key={e.id}
                            alcoholLevel={e.alcoholLevel}
                            parentComponent="addGameToPlan"
                            eventId={e.id}
                        >
                            <div>
                                <St.CalendarItemTitle
                                    $alcoholLevel={e.alcoholLevel}
                                >
                                    {e.title}
                                </St.CalendarItemTitle>
                                <St.CalendarItemTime
                                    $alcoholLevel={e.alcoholLevel}
                                >
                                    {e.time}
                                </St.CalendarItemTime>
                            </div>
                        </EventCard>
                    ))
                ) : (
                    <St.StyledEmptyEvent>
                        일정이 존재하지 않습니다.
                    </St.StyledEmptyEvent>
                )}
            </St.CalendarListBox>
        </St.CalendarListContainer>
    );
};

export default AddGameToPlan;
