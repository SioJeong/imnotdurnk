import Home from '@/pages/Home.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './src/components/_layout/Layout';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
