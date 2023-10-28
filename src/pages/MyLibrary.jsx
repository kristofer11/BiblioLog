import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal';
import LoginForm from '../components/LoginForm'
import { getLibrary } from '../redux/features/librarySlice.js'
import BookList from '../components/BookList'
import BookSearch from '../components/BookSearch'
import { useNavigate } from 'react-router-dom'
import '../styles/myLibrary.scss'
import ReadingByWater from '../assets/readingbythewater.jpg'

const MyLibrary = () => {
    const userName = useSelector((state) => state.user.userName);
    const dispatch = useDispatch();
    const library = useSelector((state) => state.library.books)
    const token = localStorage.getItem('token')

    // ADD BOOK MODAL STATE VARIABLES
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [formData, setFormData] = useState({
        title: '',
        author: '',
        rating: '',
        review: ''
    });

    if (!token) {
        return (
            <div className='library-container'>
                <h1>My Library</h1>
                <p className='login-msg'>Please Login to view your library.</p>
                <div className="my-library-login-div d-flex">
                    <LoginForm />
                    <img src={ReadingByWater} alt="man with cup of coffee reading book by the ocean"  />
                </div>


            </div>
        )
    }

    return (
        <div className='library-container'>
            <h1>My Library</h1>
            <h2 className='welcome-heading'>Welcome, {userName}</h2>
            <Button
                className='newBookBtn'
                onClick={handleShow}
            >
                Add New Book
            </Button>
            <BookList />
            <Modal show={show} onHide={handleClose} className='newBookModal'>
                <Modal.Header closeButton>
                    <Modal.Title>Add Book</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <BookSearch
                        setFormData={setFormData}
                        handleClose={handleClose}
                    />
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default MyLibrary