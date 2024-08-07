import Layout from '@/components/_layout/Layout';
import Account from '@/pages/Account.jsx';
import Calendar from '@/pages/Calendar';
import CheckEmail from '@/pages/CheckEmail';
import ComponentTest from '@/pages/ComponentTest';
import FindPassword from '@/pages/FindPassword';
import Home from '@/pages/Home.jsx';
import ModalTest from '@/pages/ModalTest';
import MyPage from '@/pages/MyPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Game from './src/pages/Game';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/account" element={<Account />} />
                    <Route path="/check-email" element={<CheckEmail />} />
                    <Route path="/find-password/" element={<FindPassword />} />
                    <Route path="/calendar/*" element={<Calendar />} />
                    <Route path="/modaltest" element={<ModalTest />} />
                    <Route path="/componenttest" element={<ComponentTest />} />
                    <Route path="/mypage/*" element={<MyPage />} />
                    <Route path="/game/*" element={<Game />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
