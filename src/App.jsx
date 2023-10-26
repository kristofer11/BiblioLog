import { useState, useEffect } from 'react'
import './styles/App.scss'
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import MyLibrary from './pages/MyLibrary';
import Login from './pages/Login';
import Register from './pages/Register';
import { checkToken } from './redux/features/userSlice';
import { useDispatch, useSelector } from 'react-redux'; 

function App() {
    const dispatch = useDispatch();
    dispatch(checkToken());

    return (
        <>
            <div className='background'></div>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/my-library" element={<MyLibrary />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </ Routes>
            <Footer />
        </>
    )
}

export default App
