// import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './components/context/AuthContext';
import Login from './components/login/Login';
import LandingPage from './components/profile/LandingPage';

function App() {

  return (
    <>
      <AuthProvider>
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/forgot" element={<ForgotPw />} /> */}
          <Route path="/landingPage/*" element={<LandingPage />}/>
          {/* <Route path="/edit/:id" element={<EditBlog/>} /> */}
          {/* <Route path="*" element={<NoPage />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
    </AuthProvider>
    </>
  )
}

export default App
