import { logout } from '../redux/features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Nav, Navbar } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Header = () => {
    const dispatch = useDispatch();
    const loggedIn = useSelector((state) => state.user.isLoggedIn);
    const token = localStorage.getItem('token')
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
    }

    return (

        <Navbar expand='md' className='navbar-light' >
            <Navbar.Brand>
                <Link 
                to={loggedIn ? "/my-library" : "/"}
                >
                    <h1>BiblioLog</h1>   
                </Link>                 
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='responsive-navbar-nav' className='custom-toggler' />
            <Navbar.Collapse id='responsive-navbar-nav' >
                <Nav>
                    {/* <Nav.Link href="/">Home</Nav.Link> */}
                    <Link to="/my-library" className='nav-link'>My Library</Link>
                    {!loggedIn && <Nav.Link href="/register" className='nav-link'>Register</Nav.Link>}
                    {!loggedIn && <Nav.Link href="/login" className='nav-link'>Login</Nav.Link>}
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
