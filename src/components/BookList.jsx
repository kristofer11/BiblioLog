import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import BookItem from './BookItem'
import { getLibrary } from '../redux/features/librarySlice'

const BookList = () => {
    const userId = useSelector((state) => state.user.id)
    const dispatch = useDispatch()

    const library = useSelector((state) => state.library.books)

    useEffect(() => {
        if (!library) {
            return
        }        
        if (!library.length) {
            dispatch(getLibrary())
        }
    }, [dispatch, library])

    return (
        <div className='book-list'>
            {library && library.length > 0 ? library.map((book) => (
                <BookItem
                    key={book._id}
                    img={book.img}
                    author={book.author}
                    title={book.title}
                    rating={book.rating}
                    review={book.review}
                    bookId={book._id}
                />
            )) : <p>No books to load yet...</p>}
        </div>
    )
}

export default BookList