
const BookItem = ({ title, author, rating, review, bookId, img }) => {
    return (
        <details className='bookItem'>
            <summary>
                <img src={img} alt={`Cover of the book ${title} by ${author}.`} style={{maxWidth: '111px'}} />
            </summary>
            <h3>Title: {title}</h3>
            <h4>Author: {author ? author : 'no author'}</h4>
            <p>Your Rating: {rating ? rating : 'no rating'}</p>
            <p>Review: {review ? review : '(no review available)'}</p>
            <button className='delete-btn btn btn-danger'
                // onClick={() => {
                //     deleteBook(bookId, id)
                //     fetchLibraryData()
                // }}
            >
                Delete
            </button>
        </details>
    )
}

export default BookItem