import { logout } from '../redux/features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Nav, Navbar } from 'react-bootstrap';

const Header = () => {
    const dispatch = useDispatch();
    const loggedIn = useSelector((state) => state.user.isLoggedIn);

    const handleLogout = () => {
        dispatch(logout());
    }

    return (

        <Navbar expand='md' className='navbar-light' >
            <Navbar.Brand href="/">
                <h1>My Library</h1>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='responsive-navbar-nav' className='custom-toggler' />
            <Navbar.Collapse id='responsive-navbar-nav' >
                <Nav>
                    {/* <Nav.Link href="/">Home</Nav.Link> */}
                    <Nav.Link href="/my-library ">My Library</Nav.Link>
                    {!loggedIn && <Nav.Link href="/register">Register</Nav.Link>}
                    {!loggedIn && <Nav.Link href="/login">Login</Nav.Link>}
                    {loggedIn && <Nav.Link onClick={(e) => {
                        e.preventDefault();
                        handleLogout();
                        // navigate('/login')
                    }

                    }
                        href="/login"
                    >
                        Logout
                    </Nav.Link>
                    }
                </Nav>
            </Navbar.Collapse>

        </Navbar>
    )
}

export default Header;