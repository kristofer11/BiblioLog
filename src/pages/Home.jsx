import { Link } from 'react-router-dom';

const Home = () => {
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