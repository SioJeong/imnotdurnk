import Profile from '@/components/mypage/Profile';
import ProfileCreateAlcoholCapacity from '@/components/mypage/ProfileCreateAlcoholCapacity';
import ProfileCreateInfo from '@/components/mypage/ProfileCreateInfo';
import ProfileCreateVoice from '@/components/mypage/ProfileCreateVoice';
import ProfileUpdate from '@/components/mypage/ProfileUpdate';
import Statistics from '@/components/statistics/Statistics';
import { Route, Routes } from 'react-router-dom';
import useMyPageNavigation from '../hooks/useMyPageNavigation';
const MyPage = () => {
    useMyPageNavigation();

    return (
        <>
            <Routes>
                <Route path="/" element={<Statistics />} />
                <Route path="/profile" element={<Profile />} />
                <Route
                    path="/profile/create/info"
                    element={<ProfileCreateInfo />}
                />
                <Route
                    path="/profile/create/alcohol-capacity"
                    element={<ProfileCreateAlcoholCapacity />}
                />
                <Route
                    path="/profile/create/voice"
                    element={<ProfileCreateVoice />}
                />
                <Route path="/profile/update" element={<ProfileUpdate />} />
            </Routes>
        </>
    );
};

export default MyPage;
