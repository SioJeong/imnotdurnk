import Layout from '@/components/_layout/Layout';
import CalendarView from '@/pages/CalendarView';
import Home from '@/pages/Home.jsx';
import Account from '@/pages/Account.jsx';
import CheckEmail from '@/pages/CheckEmail';
import FindPassword from '@/pages/FindPassword';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/account" element={<Account />} />
                    <Route path="/calendar" element={<CalendarView />} />
                    <Route path="/check-email" element={<CheckEmail />} />
                    <Route path="/find-password/" element={<FindPassword />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
