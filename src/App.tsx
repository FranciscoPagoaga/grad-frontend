import { useState } from 'react'
import './App.css'
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
// import LandingPageImg from "./assets/landingpage.png"
// import LoginForm from './components/LoginForm'
import Login from './views/Login'
import { useSelector } from 'react-redux';
import { usersState } from './state';
import HomePage from './views/HomePage';
import ProfilePage from './views/ProfilePage';

function App() {
  const isAuth =  Boolean(useSelector((state: usersState) => state.token));

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={!isAuth ? <Login /> : <Navigate to="/home" />}/>
        <Route path="/home" element={isAuth ? <HomePage/> : <Navigate to="/" />} />
        <Route path="/profile/:userId" element={isAuth ? <ProfilePage/> : <Navigate to="/" />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
