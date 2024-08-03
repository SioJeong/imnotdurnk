import CalendarList from '@/components/calendar/CalendarList';
import CreatePlan from '@/components/calendar/CreatePlan';
import MainCalendar from '@/components/calendar/MainCalendar';
import PlanDetail from '@/components/calendar/PlanDetail';
import { Route, Routes } from 'react-router-dom';
import useCalendarNavigation from '../hooks/useCalendarNavigation';

const Calendar = () => {
    useCalendarNavigation();

    return (
        <Routes>
            <Route path="/" element={<MainCalendar />} />
            <Route path="/:date" element={<CalendarList />} />
            <Route path="/:date/item/:planId" element={<PlanDetail />} />
            <Route path="/create-plan" element={<CreatePlan />} />
        </Routes>
    );
};

export default Calendar;
