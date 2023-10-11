import { Form, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, setUser } from '../redux/features/userSlice';
import { useNavigate } from 'react-router-dom';
// import useLogin from '../utils/Login';


const LoginForm = () => {
    // const { handleLogin } = useLogin();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userName = useSelector((state) => state.user.userName);

    const handleLogin = async (e) => {
        e.preventDefault();
        const email = formData.email;
        const password = formData.password;

        dispatch(login({ email, password }))
        navigate('/my-library')
    }

    //     const [formErrors, setFormErrors] = useState({
    //         email: '',
    //         password: ''
    //     });

    //     const submitLogin = async (event) => {
    //         event.preventDefault();

    //         let hasErrors = false;
    //         const errors = {};

    //         if (!formData.email) {
    //             hasErrors = true;
    //             errors.email = 'Email is required.';
    //         }

    //         if (!formData.password) {
    //             hasErrors = true;
    //             errors.password = 'Password is required.';
    //         }

    //         if (hasErrors) {
    //             setFormErrors(errors);
    //             return;
    //         }

    //         try {
    //             const response = await fetch(`${apiUrl}/api/users/login`, {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/json'
    //                 },
    //                 body: JSON.stringify(formData)
    //             });

    //             if (response.ok) {
    //                 // Handle successful response
    //                 const data = await response.json();
    //                 const token = data.token;
    //                 const id = data._id;
    //                 localStorage.setItem('token', token);
    //                 localStorage.setItem('id', id)
    //                 console.log('User logged in successfully', data);


    //                 // router.push('/my-library')

    //             } else {
    //                 // Handle error response
    //                 const errorData = await response.json();
    //                 setServerErrors(errorData.message)
    //                 console.error('Failed to update user:', errorData);
    //             }
    //         } catch (error) {
    //             // Handle network error
    //             console.error('Network error:', error);
    //         }
    //     };

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

    return (
        <Form
            // onSubmit={submitLogin} 
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
        </Form>
    )
}

export default LoginForm