import { Route, Routes } from 'react-router-dom';
import ProfileCreate from './ProfileCreate';
import ProfileUpdate from './ProfileUpdate';
const Profile = () => {
    return (
        <>
            <Routes>
                <Route path="/create" element={<ProfileCreate />} />
                <Route path="/update" element={<ProfileUpdate />} />
            </Routes>
        </>
    );
};

export default Profile;
