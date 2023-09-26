// LandingPage.js
import { Route,Routes } from 'react-router-dom';
import Profile from './Profile'
import LogOut from '../login/Logout';
import Header from '../Basic/Header'

const LandingPage = () => {
  return (
    <div>
      <Header/>
        <Routes>
            <Route index element = {<Profile />} />
            <Route path="logout" element={<LogOut />} />
        </Routes>
    </div>
  );
};

export default LandingPage;
