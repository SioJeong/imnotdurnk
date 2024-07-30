import Layout from '@/components/_layout/Layout';
import Account from '@/pages/Account.jsx';
import CalendarView from '@/pages/CalendarView';
import ComponentTest from '@/pages/ComponentTest';
import Home from '@/pages/Home.jsx';
import CheckEmail from '@/pages/CheckEmail';
import FindPassword from '@/pages/FindPassword';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ModalTest from './src/pages/ModalTest';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<ComponentTest />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/account" element={<Account />} />
                    <Route path="/calendar/*" element={<CalendarView />} />
                    <Route path="/check-email" element={<CheckEmail />} />
                    <Route path="/find-password/" element={<FindPassword />} />
                    <Route path="/modaltest" element={<ModalTest />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
