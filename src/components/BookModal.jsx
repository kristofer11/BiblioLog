//THIS MODAL IS NOT IN USE. MOVED INTO BOOK ITEM FOR NOW. SEPARATE THIS LATER.

import { Modal } from 'react-bootstrap'
import { useState } from 'react'

import React from 'react'

const BookModal = ({ title, author, rating, review, bookId, img, handleBookClose, showBook }) => {
    // VIEW BOOK MODAL STATE VARIABLES
    // const [showBook, setShowBook] = useState(false);
    // const handleBookClose = () => setShowBook(false);
    // const handleBookShow = () => setShowBook(true);

    const handleDelete = () => {
        dispatch(deleteBook({ bookId: bookId }))
        dispatch(getLibrary())
    }

    return (
        <div>
            <Modal
                onHide={handleBookClose}
                className="viewBookModal"
                show={showBook}
            >
                <Modal.Header closeButton >
                    <Modal.Title>{title}</Modal.Title>
                    <Modal.Body>
                        <img src={img} ></img>
                        <p>Author: {author}</p>
                        <p>Rating: {rating}</p>
                        <p>Review: {review}</p>
                        <button className='delete-btn btn btn-danger'
                            onClick={handleDelete}
                        >
                            Delete
                        </button>
                    </Modal.Body>
                </Modal.Header>
            </Modal>
        </div>
    )
}

export default BookModal