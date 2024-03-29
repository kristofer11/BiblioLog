import { Form, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/features/userSlice';

const RegisterForm = () => {
    const router = useNavigate();
    const dispatch = useDispatch();
    const isLoading = useSelector((state) => state.user.isLoading);

    const registerError = useSelector((state) => state.user.error);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });



    const handleRegister = (e) => {
        e.preventDefault();
        console.log('Registering user:', formData);

        const toMyLibrary = () => {router('/my-library')}
        dispatch(register(formData))
            .then((response) => {
                toMyLibrary();
            })
            .catch((error) => {
                console.error('Registration error:', error);
            });
    };

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    const isPasswordMatched = () => {
        return formData.password === formData.confirmPassword;
    }

    return (
        <div>
            {registerError && <p style={{ color: 'red' }}>{registerError}</p>}
            {isLoading && <p className='loading-msg-register'>Loading your library...</p>}
            <Form
                onSubmit={(e) => {
                    handleRegister(e)
                }}
            >
                <Form.Group className='formGroup'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        minLength={4}
                    />
                </Form.Group>

                <Form.Group className='formGroup'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className='formGroup'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter password"
                        name="password"
                        minLength={4}
                        value={formData.password}
                        onChange={handleChange}
                    />
                </Form.Group>
                {/* confirm password */}
                <Form.Group className='formGroup'>
                    <Form.Label>Confirm</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Confirm password"
                        name="confirmPassword"
                        minLength={4}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        isInvalid={!isPasswordMatched()}
                    />
                    <Form.Control.Feedback type="invalid">
                        Passwords do not match.
                    </Form.Control.Feedback>
                </Form.Group>
                <Button variant="primary" type="submit" className='form-submit-btn' disabled={!isPasswordMatched()}>Submit</Button>
            </Form>
        </div>
    )
}

export default RegisterForm