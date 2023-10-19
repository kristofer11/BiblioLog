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
    <h3 className='welcomeMsg'>Welcome to My Library</h3>
    <div className='homeLinks'>
        <Link to="/my-library">View Library</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>                
    </div>
</>
  )
}

export default Home
