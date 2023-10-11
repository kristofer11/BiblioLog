import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addBook } from '../redux/features/librarySlice';
// import submitNewBook from '../api/submitNewBook';

function BookSearch({ setFormData, clearForm, handleClose, show, setShow, formData }) {
    const [query, setQuery] = useState('');
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
    const [selectedTitle, setSelectedTitle] = useState('');
    const [selectedAuthor, setSelectedAuthor] = useState('');
    const [rating, setRating] = useState(5);
    const [review, setReview] = useState('');
    const [img, setImg] = useState('');
    const [showSearchResults, setShowSearchResults] = useState(true);
    const [showSearchBar, setShowSearchBar] = useState(true);

    const searchBooks = async () => {
        try {
            const response = await axios.get(
                `https://www.googleapis.com/books/v1/volumes?q=${query}`
            );
            setBooks(response.data.items);
            setShowSearchResults(true);
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
        setSelectedAuthor(book.volumeInfo.authors.join(', '));
        setImg(book.volumeInfo.imageLinks.thumbnail)
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
        setImg(selectedBook.volumeInfo.imageLinks.thumbnail)
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
        <div>
            {showSearchBar && <form onSubmit={handleSearch}>
                <input type="text" value={query} onChange={handleInputChange} />
                <button type="submit">Search</button>
            </form>
            }

            {selectedBook && (
                <form onSubmit={handleSubmit}>
                    <h3>{selectedBook.volumeInfo.title}</h3>
                    <p>{selectedBook.volumeInfo.authors.join(', ')}</p>
                    <img src={selectedBook.volumeInfo.imageLinks.thumbnail} alt={selectedBook.volumeInfo.title} width='99'/>
                    <label>
                        Rating:
                        <output htmlFor="rating" style={{ marginLeft: '0.5rem', fontSize: '2rem', color: 'green' }}>{rating}</output>

                        <input type="range" min="0" max="5" id='rating' name='rating' default='5' value={rating} onChange={handleRatingChange} />
                    </label>
                    <label>
                        Review:
                        <textarea value={review} onChange={handleReviewChange} />
                    </label>
                    <button type="submit">Add to Library</button>
                </form>
            )}
            {showSearchResults && (
                <ul>
                    {books.map((book) => (
                        <li key={book.id}>
                            <h3>{book.volumeInfo.title}</h3>
                            <p>{book.volumeInfo.authors.join(', ')}</p>
                            <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
                            <button onClick={() => handleAddToLibrary(book)}>Add to Library</button>
                            <hr />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default BookSearch;