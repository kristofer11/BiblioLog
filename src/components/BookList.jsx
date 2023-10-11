import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import BookItem from './BookItem'
import { getLibrary } from '../redux/features/librarySlice'

const BookList = () => {
    const userId = useSelector((state) => state.user.id)
    const dispatch = useDispatch()
    console.log('book list engage')

    useEffect(() => {
        dispatch(getLibrary())
    }, [dispatch])

    const library = useSelector((state) => state.library.books)


    return (
        // <div>
        //     {userId ? library.map((book) => {
        //         <BookItem
        //             key={book._id}
        //             img={book.img}
        //             author={book.author}
        //             title={book.title}
        //             rating={book.rating}
        //             review={book.review}
        //             bookId={book._id}
        //         />
        //     }) : <p>Error, no books to load...</p>}
        // </div>
        <div>
        {library.map((book) => (
            <BookItem
                key={book._id}
                img={book.img}
                author={book.author}
                title={book.title}
                rating={book.rating}
                review={book.review}
                bookId={book._id}
            />
        ))}
    </div>
    )
}

export default BookList