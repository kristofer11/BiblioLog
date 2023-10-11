import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import LoginForm from '../components/LoginForm'
import { getLibrary } from '../redux/features/librarySlice.js'
import BookList from '../components/BookList'

const MyLibrary = () => {
    const userName = useSelector((state) => state.user.userName);
    const dispatch = useDispatch();
    const library = useSelector((state) => state.library.books)
    const token = localStorage.getItem('token')

    console.log(library, 'bullshit')

    if (!token) {
        return (
            <>
                <p>Please Login to view your library.</p>
                <LoginForm />
            </>
        )
    }

    return (
        <div>
            <h1>MyLibrary</h1>
            <h1 style={{ color: 'pink' }}>{userName}</h1>
            <BookList />
        </div>            
        )
}

export default MyLibrary