// LandingPage.js
import { Route,Routes } from 'react-router-dom';
import Profile from './Profile'
import LogOut from '../login/Logout';

const LandingPage = () => {
  return (
    <div>
        <Routes>
            <Route index element = {<Profile />} />
            <Route path="logout" element={<LogOut />} />
        </Routes>
    </div>
  );
};

export default LandingPage;
