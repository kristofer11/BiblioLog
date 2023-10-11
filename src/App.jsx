import { useState, useEffect } from 'react'
import './styles/App.scss'
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import MyLibrary from './pages/MyLibrary';
import Login from './pages/Login';
import Register from './pages/Register';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, clearUser } from './redux/features/userSlice';
import { getLibrary } from './redux/features/librarySlice';

function App() {

    return (
        <>
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
