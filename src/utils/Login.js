import { useDispatch } from 'react-redux';
import { login } from '../redux/features/userSlice';
import { useNavigate } from 'react-router-dom';

const useLogin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (e, email, password) => {
        e.preventDefault();

        dispatch(login({ email, password }))
        navigate('/my-library')
    };

    return { handleLogin };
};

export default useLogin;
