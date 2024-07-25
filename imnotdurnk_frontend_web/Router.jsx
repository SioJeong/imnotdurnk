import Layout from '@/components/_layout/Layout';
import CalendarView from '@/pages/CalendarView';
import Home from '@/pages/Home.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/calendar" element={<CalendarView />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
