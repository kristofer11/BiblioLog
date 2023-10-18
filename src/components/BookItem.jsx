import { deleteBook, getLibrary } from '../redux/features/librarySlice'
import { useDispatch, useSelector } from 'react-redux'

const BookItem = ({ title, author, rating, review, bookId, img }) => {
    const dispatch = useDispatch()

    const handleDelete = () => {
        dispatch(deleteBook({bookId: bookId}))
        dispatch(getLibrary())
    }

    return (
        <details className='bookItem'>
            <summary>
                <img src={img} alt={`Cover of the book ${title} by ${author}.`} />
            </summary>
            <h3>Title: {title}</h3>
            <h4>Author: {author ? author : 'no author'}</h4>
            <p>Your Rating: {rating ? rating : 'no rating'}</p>
            <p>Review: {review ? review : '(no review available)'}</p>
            <button className='delete-btn btn btn-danger'
                onClick={handleDelete}
            >
                Delete
            </button>
        </details>
    )
}

export default BookItem