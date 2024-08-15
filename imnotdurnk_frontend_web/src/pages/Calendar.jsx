import CalendarList from '@/components/calendar/CalendarList';
import CreatePlan from '@/components/calendar/CreatePlan';
import MainCalendar from '@/components/calendar/MainCalendar';
import PlanDetail from '@/components/calendar/PlanDetail';
import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { ToastWarning } from '../components/_common/alert';
import EditPlan from '../components/calendar/EditPlan';
import useCalendarNavigation from '../hooks/useCalendarNavigation';
import useAuthStore from '../stores/useAuthStore';

const Calendar = () => {
    useCalendarNavigation();
    const navigate = useNavigate();

    const { accessToken } = useAuthStore();

    useEffect(() => {
        if (!accessToken) {
            ToastWarning('로그인이 필요합니다.', false);
            navigate('/account');
        }
    }, [accessToken]);

    return (
        <Routes>
            <Route path="/" element={<MainCalendar />} />
            <Route path="/:date" element={<CalendarList />} />
            <Route path="/:date/plan/:planId" element={<PlanDetail />} />
            <Route path="/create-plan" element={<CreatePlan />} />
            <Route path="/edit-plan/:planId" element={<EditPlan />} />
        </Routes>
    );
};

export default Calendar;
