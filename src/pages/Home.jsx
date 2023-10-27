import { Link } from 'react-router-dom';
import '../styles/home.scss';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import ReadingByWater from '../assets/readingbythewater.jpg';
import GirlWithBoyBook from '../assets/girlWithBoyBook.png';

const Home = () => {
    const dispatch = useDispatch()

    useEffect(() => {

    })
    return (
        <>
            <div className="welcome-message">
                <h3>Welcome to BiblioLog</h3>
                <h4 className='d-none d-md-block'>Register or login to track and review books you've read.</h4>
            </div>
            <div className='d-flex justify-content-center hero-div'>
                <div className='homeLinks'>
                    <Link to="/my-library">View Library</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </div>
                <img src={GirlWithBoyBook} alt='Man drinking a cup of coffee and reading a book while sitting near the ocean' />
            </div>

        </>
    )
}

export default Home
