import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import { getDailyEventList } from '../../services/calendar';
import * as St from './CalendarList.style';
import CalendarStatusBar from './CalendarStatusBar';
import EventCard from './EventCard';

const CalendarList = () => {
    const location = useLocation();
    const date = location.pathname.split('/')[2];

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

    return (
        <St.CalendarListContainer>
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
                            parentComponent="calendarList"
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

export default CalendarList;
