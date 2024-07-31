import { Route, Routes } from 'react-router-dom';
import ProfileCreate from './ProfileCreateInfo';
import ProfileUpdate from './ProfileUpdate';
const Profile = () => {
    return (
        <>
            <Routes>
                <Route path="/create/*" element={<ProfileCreate />} />
                <Route path="/update" element={<ProfileUpdate />} />
            </Routes>
        </>
    );
};

export default Profile;
