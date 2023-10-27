import { deleteBook, getLibrary } from '../redux/features/librarySlice'
import { useDispatch, useSelector } from 'react-redux'
import BookModal from '../components/BookModal'
import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import EditIcon from '../assets/icons/edit'

//ADD THE EDIT ICONS BACK IN ONCE EDIT FUNCTIONALITY IS IN PLACE

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
                <div>
                    <h3>{title}</h3>
                    <h4>By: {author}</h4>
                </div>

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
                    <img src={img} alt={`Cover of ${title} by ${author}.`} />

                    <div>
                        <p className='author'>Author: {author}</p>
                        <p className='rating'>
                            Rating: {rating}
                            {/* <span className='modal-edit-btn' onClick={() => console.log('clicked')}>
                            <EditIcon />
                        </span> */}
                        </p>
                        <p className='review'>
                            Review: {review}
                            {/* <span className='modal-edit-btn' onClick={() => console.log('clicked')}>
                            <EditIcon />
                        </span> */}
                        </p>
                    </div>



                    <div className="buttons">
                        <button className='delete-btn btn btn-danger'
                            onClick={handleDelete}
                        >
                            Delete
                        </button>
                    </div>

                </Modal.Body>
            </Modal>
        </>

    )
}

export default BookItem