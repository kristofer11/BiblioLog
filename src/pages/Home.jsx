import { Link } from 'react-router-dom';
import '../styles/home.scss';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

const Home = () => {
    const dispatch = useDispatch()

    useEffect(() => {

    })
    return (
        <>
            <div className="welcome-message">
                <h3>Welcome to BiblioLog</h3>
                <h4>Register or login to track and review books you've read.</h4>
            </div>
            <div className='homeLinks'>
                <Link to="/my-library">View Library</Link>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </div>
        </>
    )
}

export default Home
