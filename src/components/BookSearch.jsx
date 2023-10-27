import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addBook } from '../redux/features/librarySlice';
// import submitNewBook from '../api/submitNewBook';
import NoImage from '../assets/forest-book.png'
import '../styles/bookSearch.scss'

function BookSearch({ setFormData, clearForm, handleClose, show, setShow, formData }) {
    const [query, setQuery] = useState('');
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
    const [selectedTitle, setSelectedTitle] = useState('');
    const [selectedAuthor, setSelectedAuthor] = useState('');
    const [rating, setRating] = useState(5);
    const [review, setReview] = useState('');
    const [img, setImg] = useState('');
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [showSearchBar, setShowSearchBar] = useState(true);
    const [showError, setShowError] = useState(false)

    const searchBooks = async () => {
        try {
            const response = await axios.get(
                `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=20`
            );
            console.log(query, response.data.items)
            if (response.data.items) {
                setShowError(false)
                setBooks(response.data.items);
                setShowSearchResults(true);
            }
            if (response.data.items === undefined) {
                setShowSearchResults(false);
                setShowError(true);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleSearch = (event) => {
        event.preventDefault();
        searchBooks();
    };

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    const handleAddToLibrary = (book) => {
        setSelectedBook(book);
        setSelectedTitle(book.volumeInfo.title);
        if (book.volumeInfo.authors) {
            book.volumeInfo.authors[1] ? setSelectedAuthor(book.volumeInfo.authors.join(', ')) : setSelectedAuthor(book.volumeInfo.authors[0]);
        } else {
            setSelectedAuthor('Unknown')
        }

        book.volumeInfo.imageLinks ? setImg(book.volumeInfo.imageLinks.thumbnail) : setImg(NoImage)
        setBooks(books.filter((b) => b.id !== book.id));
        setShowSearchResults(false);
    };

    const handleRatingChange = (event) => {
        setRating(event.target.value);
    };

    const handleReviewChange = (event) => {
        setReview(event.target.value);
    };

    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        setShowSearchBar(false)
        selectedBook.volumeInfo.imageLinks ? setImg(selectedBook.volumeInfo.imageLinks.thumbnail) : setImg(NoImage)
        console.log(img)
        // TODO: Add book to library with selectedBook, rating, and review
        setSelectedTitle('');
        setSelectedAuthor('');
        setRating(0);
        setReview('');
        const bookData = {
            title: selectedTitle,
            author: selectedAuthor,
            rating: rating,
            review: review,
            img: img
        }

        // PUSH NEW BOOK TO LIBRARY
        const submitNewBook = () => {
            dispatch(addBook(bookData));
        }
        submitNewBook();
        handleClose();
    };

    return (
        <div className='book-search-modal'>
            {showSearchBar && <form onSubmit={handleSearch} className='search-bar'>
                <input type="text" value={query} onChange={handleInputChange} />
                <button type="submit" className='search-btn'>Search</button>
            </form>
            }
            {showError && <p>No books found, try again.</p>}
            {selectedBook && (
                <form className='submit-form' onSubmit={handleSubmit}>
                    <div className='d-flex gap-3 book-info'>
                        <img src={selectedBook.volumeInfo.imageLinks ? selectedBook.volumeInfo.imageLinks.thumbnail : NoImage} alt={selectedBook.volumeInfo.title} width='99' />
                        <div className='title-author'>
                            <h3>{selectedBook.volumeInfo.title}</h3>
                            <p>{selectedBook.volumeInfo.authors ? selectedBook.volumeInfo.authors.join(', ') : 'unknown'}</p>
                        </div>
                    </div>


                    <label>
                        Rating:
                        <output htmlFor="rating" style={{ marginLeft: '0.5rem', fontSize: '2rem', color: 'green' }}>{rating}</output>

                        <input type="range" min="0" max="5" id='rating' name='rating' default='5' value={rating} onChange={handleRatingChange} />
                    </label>
                    <label style={{ width: '100%' }}>
                        Review:
                        <textarea className='review-input' value={review} onChange={handleReviewChange} />
                    </label>
                    <button type="submit">Add to Library</button>
                </form>
            )}
            {showSearchResults && books.length === 0 && (
                <p>No books found</p>
            )}
            {showSearchResults && (
                <ul className='result-list'>
                    {books.map((book) => (
                        <li key={book.id}>
                            <img
                                src={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : NoImage}
                                alt={book.volumeInfo.title}
                            />
                            <div>

                                <h3>{book.volumeInfo.title}</h3>
                                <p>
                                    {book.volumeInfo.authors ? (book.volumeInfo.authors.length > 1 ? book.volumeInfo.authors.join(', ') : book.volumeInfo.authors) : null}
                                </p>
                                {/* <p>
                                {book.volumeInfo.authors.length > 1 ? `By ${book.volumeInfo.authors.join(', ')}` : `By ${book.volumeInfo.authors}`}
                            </p>      */}
                                <button onClick={() => handleAddToLibrary(book)}>Add to Library</button>
                            </div>

                            <hr />
                            <hr />
                            <hr />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default BookSearch;