import { Route, Routes } from 'react-router-dom';
import ProfileCreateAlcholCapacity from './ProfileCreateAlcholCapacity';
import ProfileCreateInfo from './ProfileCreateInfo';
import ProfileCreateVoice from './ProfileCreateVoice';
const Profile = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<ProfileCreateInfo />} />
                <Route
                    path="/alchol-capacity"
                    element={<ProfileCreateAlcholCapacity />}
                />
                <Route path="/voice" element={<ProfileCreateVoice />} />
            </Routes>
        </>
    );
};

export default Profile;
