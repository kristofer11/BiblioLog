//Sample array to work with during development
let myLibrary = [
    {
        id: 0,
        title: "The Fellowship of the Rings",
        author: "Tolkien",
        pages: 1100,
        read: true
    },
    {
        id: 1,
        title: "The Silver Chair",
        author: "Lewis",
        pages: 222,
        read: true
    }
];

const libraryDisplay = document.getElementById('libraryDisplayContainer');

//Add event listener to these to get input for 'addBook'?
let titleInput = document.querySelector('#titleInput');
let authorInput = document.querySelector('#authorInput');
let pagesInput = document.querySelector('#pagesInput');
const submitButton = document.querySelector('#submitButton');

//Creates new book object
class Book {
    constructor(title, author, pages, read) {
        this.title = title
        this.author = author
        this.pages = pages
        this.read = read
    }
};

//Adds book to the library array
//Need to add validation so that a repeat title is not possible.
function addBook(titleInput, authorInput, pagesInput) {
    if (myLibrary.some(book => book['title'] === titleInput)) {
        alert(`Sorry, ${titleInput} is already in your library. Enter another book.`);
        return;
    } 
    let newBook = new Book(titleInput, authorInput, pagesInput)

    newBook.id = myLibrary.length;
    myLibrary.push(newBook);
    console.log(`${newBook.title} was added to your library!`)
    console.log(myLibrary);
    populateLibrary();
}

//Event listeners
submitButton.addEventListener('click', (e) => e.preventDefault());
submitButton.addEventListener('click', () => {
    addBook(titleInput.value, authorInput.value, pagesInput.value);
    resetInputs();
});

//Reset form after submission
function resetInputs() {
    titleInput.value = '';
    authorInput.value = '';
    pagesInput.value = 10;
}

//Create an element for each book in the library array and displays
const populateLibrary = () => {

    let child = libraryDisplay.lastElementChild;
    while (child) {
        libraryDisplay.removeChild(child);
        child = libraryDisplay.lastElementChild;
    }

    myLibrary.map((book) => {
        const bookItem = libraryDisplay.appendChild(document.createElement('div'))
        bookItem.setAttribute('id', `${book.title}`)
        bookItem.classList.add('bookItem')
        const title = bookItem.appendChild(document.createElement('div'));
        const author = bookItem.appendChild(document.createElement('div'));
        const pages = bookItem.appendChild(document.createElement('div'));
        // const read = bookItem.appendChild(document.createElement('div'));
        const deleteBtn = bookItem.appendChild(document.createElement('button'));
        deleteBtn.textContent = 'Delete Book';

        title.textContent = `Title: ${book.title}`;
        author.textContent = `Author: ${book.author}`;
        pages.textContent = `Pages: ${book.pages}`;

        deleteBtn.addEventListener('click', (e) => {
            e.preventDefault();
    //THIS SEEMS TO WORK NOW, KEEP TESTING!
            removeBook(book.title);
            console.log(book.title)
        });

    })
};

const removeBook = (title) => {

    const thisBook = document.getElementById(`${title}`);
    console.log(`${title} was removed from your library`);

//THIS SEEMS TO WORK NOW! KEEP TESTING!
    myLibrary.forEach((book, index) => {
        if(book.title === title) {
            myLibrary.splice(index, 1)
        }
    });

    libraryDisplay.removeChild(thisBook)
    console.log(myLibrary);
};

populateLibrary();
console.log(myLibrary);


// NEXT STEPS:
// 1. INSTEAD OF THE FORM ALWAYS BEING ON THE top, MAKE IT A BUTTON THAT BRINGS UP A MODAL CONTAINING THE FORM.
// 2. ADD THE ABILITY TO CHANGE THE READ STATUS OF EACH Book.
// 3. STYLING: MAKE IT SNAZZY...BOOTSTRAP?
// 4. FIGURE OUT LOCAL Storage. FIND THE VIDEO USED LAST TIME IF NEEDED ( KEEP READING THROUGH THE ODIN PROJECT AND COMPLETE THIS STEP AT THE APPROPRIATE TIME)