import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import BookItem from './BookItem'
import { getLibrary } from '../redux/features/librarySlice'

const BookList = () => {
    const userId = useSelector((state) => state.user.id)
    const dispatch = useDispatch()
    console.log('book list engage')

    const library = useSelector((state) => state.library.books)

    useEffect(() => {
        if (!library.length){        
            dispatch(getLibrary())
        }
    }, [dispatch, library])

    return (
        <div>
        {library[0] ? library.map((book) => (
            <BookItem
                key={book._id}
                img={book.img}
                author={book.author}
                title={book.title}
                rating={book.rating}
                review={book.review}
                bookId={book._id}
            />
        )) : <p>Error, no books to load...</p>}
    </div>
    )
}

export default BookList