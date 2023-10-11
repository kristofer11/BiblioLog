import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { register } from '../redux/features/userSlice';

const RegisterForm = () => {
    const router = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleRegister = (e) => {
        e.preventDefault();
        console.log('Registering user:', formData);
        dispatch(register(formData));
        router('/my-library');
    }

    // const submitRegister = async (event) => {
    //     event.preventDefault();

    //     try {
    //         const response = await fetch(`${apiUrl}/api/users/`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(formData)
    //         });

    //         if (response.ok) {
    //             // Handle successful response
    //             const data = await response.json();
    //             const token = data.token;
    //             const id = data._id;
    //             localStorage.setItem('token', token);
    //             localStorage.setItem('id', id)
    //             console.log('User registered and logged in successfully', data);

    //             router.push('/my-library');
    //         } else {
    //             // Handle error response
    //             const errorData = await response.json();
    //             console.error('Failed to update user:', errorData);
    //         }
    //     }
    //     catch (error) {
    //         console.error('Error', error)
    //     }
    // }

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    return (
        <div>
            <Form
                onSubmit={handleRegister}
            >
                <Form.Group className='formGroup'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className='formGroup'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="text"
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
                        value={formData.password}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className='formSubmitBtn' >Submit</Button>
            </Form>
        </div>
    )
}

export default RegisterForm