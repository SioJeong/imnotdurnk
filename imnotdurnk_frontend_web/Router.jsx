import Home from '@/pages/Home.jsx';
import Layout from '@/components/_layout/Layout';

import { BrowserRouter, Route, Routes } from 'react-router-dom';



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
