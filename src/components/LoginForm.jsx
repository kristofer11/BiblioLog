import { Form, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearUser, clearLoading, setLoading } from '../redux/features/userSlice';
import { useNavigate } from 'react-router-dom';
// import useLogin from '../utils/Login';
import { clearLibrary } from '../redux/features/librarySlice';


const LoginForm = () => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userName = useSelector((state) => state.user.userName);
    const isLoading = useSelector((state) => state.user.isLoading);
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated)
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn)

    // dispatch(clearLoading())

    const handleLogin = async (e) => {
        e.preventDefault();
        const email = formData.email;
        const password = formData.password;
        
        dispatch(clearLibrary())
        dispatch(setLoading())
        dispatch(login({ email, password }))
        navigate('/my-library')
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        let error = '';

        if (name === 'email') {
            if (!value) {
                error = 'Email is required.';
            }
        } else if (name === 'password') {
            if (!value) {
                error = 'Password is required.';
            }
        }

        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const loginError = useSelector((state) => state.user.error);


    
    return (
        <>
            {isLoading && <p className='loading-msg'>Loading...</p>}
            {loginError && <p style={{ color: 'red' }}>Error: {loginError}</p>}
            { !isLoggedIn && <Form
                onSubmit={handleLogin}
            >
                {/* {serverErrors && <p className="error-message text-danger">{serverErrors}</p>} */}
                <Form.Group className='formGroup'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="text"
                        name="email"
                        placeholder="Enter email"
                        value={formData.email}
                        onChange={handleChange}
                    // isInvalid={!!formErrors.email}
                    />
                </Form.Group>
                <Form.Group className='formGroup'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        value={formData.password}
                        onChange={handleChange}
                    // isInvalid={!!formErrors.password}
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className='formSubmitBtn'>Submit</Button>
            </Form>}
        </>
    )
}

export default LoginForm