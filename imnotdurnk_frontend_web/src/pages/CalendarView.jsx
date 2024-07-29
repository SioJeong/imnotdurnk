import useNavigationStore from '@/stores/useNavigationStore';
import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import CalendarItem from '../components/calendar/CalendarItem';
import CalendarStatusBar from '../components/calendar/CalendarStatusBar';
import EventListOnDate from '../components/calendar/EventListOnDate';
import ReactCalendar from '../components/calendar/ReactCalendar';
import useCalendarStore from '../stores/useCalendarStore';

const CalendarView = () => {
    const [view, setView] = useState('month'); // 초기 값 month 뷰
    const { statusOnDate, setStatusOnDate } = useCalendarStore();
    const setNavigation = useNavigationStore((state) => state.setNavigation);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // 경로에 따라 네비게이션 상태 설정
        if (location.pathname === '/calendar') {
            setNavigation({
                isVisible: true,
                icon1: { iconname: 'address' },
                title: '캘린더',
                icon2: { iconname: 'plus' },
            });
        } else {
            setNavigation({
                isVisible: true,
                icon1: {
                    iconname: 'backarrow',
                    onClick: () => navigate('/calendar'),
                },
                title: '캘린더',
                icon2: { iconname: 'plus' },
            });
        }
    }, [location.pathname, navigate, setNavigation]);

    const handleItemClick = (date) => {
        const adjustedDate = new Date(date);
        adjustedDate.setDate(date.getDate() + 1); // 일자 +1 조정

        const formattedDate = adjustedDate.toISOString().split('T')[0]; // 날짜를 YYYY-MM-DD 형식으로 변환
        navigate(`/calendar/${formattedDate}`);
    };

    return (
        <div>
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <ReactCalendar
                                onChangeView={setView}
                                onStatusChange={setStatusOnDate}
                            />
                            <br />
                            <CalendarStatusBar />
                            <br />
                            {view === 'month' && (
                                <CalendarItem
                                    statusOnDate={statusOnDate}
                                    onItemClick={handleItemClick}
                                />
                            )}
                        </>
                    }
                />
                <Route
                    path="/:date"
                    element={<EventListOnDate statusOnDate={statusOnDate} />}
                />
            </Routes>
        </div>
    );

    // return (
    //     <div>
    //         <ReactCalendar
    //             onChangeView={setView}
    //             onStatusChange={setStatusOnDate}
    //         />

    //         <br />
    //         <CalendarStatusBar />
    //         <br />
    //         {view === 'month' && <CalendarItem statusOnDate={statusOnDate} />}

    //         {/* 하위 라우팅 */}
    //         <Routes>
    //             <Route
    //                 path="/"
    //                 element={<CalendarItem statusOnDate={statusOnDate} />}
    //             />
    //             <Route path=":date" element={<CalendarItem />} />
    //         </Routes>
    //     </div>
    // );
};

export default CalendarView;
