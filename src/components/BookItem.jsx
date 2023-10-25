import { deleteBook, getLibrary } from '../redux/features/librarySlice'
import { useDispatch, useSelector } from 'react-redux'
import BookModal from '../components/BookModal'
import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import EditIcon from '../assets/icons/edit'

const BookItem = ({ title, author, rating, review, bookId, img }) => {
    const dispatch = useDispatch()

    // VIEW BOOK MODAL STATE VARIABLES
    const [showBook, setShowBook] = useState(false);
    const handleBookClose = () => setShowBook(false);
    const handleBookShow = () => {
        setShowBook(true)
        console.log('handleBookShow')
        console.log(showBook)
    };

    const handleDelete = () => {
        dispatch(deleteBook({ bookId: bookId }))
        dispatch(getLibrary())
    }

    return (
        <>
            <div
                className='bookItem'
                onClick={() => handleBookShow()}
            >
                <img src={img} alt={`Cover of the book ${title} by ${author}.`} />
                <h3>{title}</h3>
            </div>
            {/* <BookModal
                // show={showBook}
                title={title}
                author={author}
                rating={rating}
                review={review}
                img={img}
                onHide={handleBookClose}
            /> */}
            <Modal
                onHide={handleBookClose}
                className="viewBookModal"
                show={showBook}
            >
                <Modal.Header closeButton ></Modal.Header>
                <Modal.Title>{title}</Modal.Title>
                <Modal.Body>
                    <img src={img} ></img>
                    <p>Author: {author}</p>
                    <p>Rating: {rating}</p>
                    <p>Review: {review}</p>
                    <div className="buttons">
                                         <button className='delete-btn btn btn-danger'
                        onClick={handleDelete}
                    >
                        Delete
                    </button>
                    <button className='edit-button'>
                        <EditIcon />
                        </button>   
                    </div>

                </Modal.Body>
            </Modal>
        </>

    )
}

export default BookItem