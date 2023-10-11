import { Link } from 'react-router-dom';
import { logout } from '../redux/features/userSlice';
import { useDispatch } from 'react-redux';

const Header = () => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    }

    return (
        <nav>
            <div>The Header</div>
            <Link to='/'>Home</Link>
            <button onClick={handleLogout}>logout</button>
        </nav>

    )
}

export default Header