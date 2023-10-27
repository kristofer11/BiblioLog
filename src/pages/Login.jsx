import LoginForm from '../components/LoginForm';
import Bookshelf from '../assets/bookshelf.png'

const Login = () => {
    return (
        // <div className='login-page-container formContainer'>
        //     <h1>Login</h1>
        //     <LoginForm />
        // </div>

        <div className='login-container'>
            <h1>Login</h1>
            {/* <p className='login-msg'>Please Login to view your library.</p> */}
            <div className="login-form-container">
                <img src={Bookshelf} alt="man with cup of coffee reading book by the ocean" />
                <LoginForm />
            </div>
        </div>
    )
}

export default Login