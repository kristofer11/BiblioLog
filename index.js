//Array of books to display.
let myLibrary = [];

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

//Creates method to toggle book as read. NOT WORKING YET
Book.prototype.toggleRead = function(){
    if (this.read) {
        this.read = false
        console.log(`${this.title} has not been read`)
    } else {
        this.read = true;  
        console.log(`${this.title} has been read`)
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
    closeModal(modal);
});

//Reset form after submission
function resetInputs() {
    titleInput.value = '';
    authorInput.value = '';
    pagesInput.value = 10;
}

//Create an element for each book in the library array and displays
const populateLibrary = () => {
 
//Drops all previous Books from the display so that current display is up-to-date
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
        const readStatus = bookItem.appendChild(document.createElement('div'));
        const readBtn = bookItem.appendChild(document.createElement('button'));
        const deleteBtn = bookItem.appendChild(document.createElement('button'));
        deleteBtn.textContent = 'Delete Book';
        deleteBtn.classList.add('deleteBtn');
        readBtn.textContent = 'Mark as "read"';
        readBtn.classList.add('readBtn')

        title.textContent = `Title: ${book.title}`;
        author.textContent = `Author: ${book.author}`;
        pages.textContent = `Pages: ${book.pages}`;

        deleteBtn.addEventListener('click', (e) => {
            e.preventDefault();
            removeBook(book.title);
        });

        readBtn.addEventListener('click', (e) => {
            e.preventDefault();
            book.toggleRead();
            book.read ? readStatus.textContent = 'READ' : readStatus.textContent = 'NOT READ'

        })
    })
};

//Remove book from display AND array
const removeBook = (title) => {

    const thisBook = document.getElementById(`${title}`);
    console.log(`${title} was removed from your library`);
    myLibrary.forEach((book, index) => {
        if(book.title === title) {
            myLibrary.splice(index, 1)
        }
    });

    libraryDisplay.removeChild(thisBook)
    console.log(myLibrary);
};



//Opening and closing "Add Book" modal
const openModalButton = document.querySelector('#openModalButton');
const closeModalButton = document.querySelector('#closeModalButton');
const overlay = document.querySelector('#overlay');

openModalButton.addEventListener('click', () => {
    const modal = document.querySelector('#modal');
    openModal(modal)
});

overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modal.active');
    modals.forEach(modal => {
        closeModal(modal)
    });
    resetInputs();
});

closeModalButton.addEventListener('click', () => {
    const modal = document.querySelector('#modal')
    closeModal(modal);
});

function openModal(modal) {
    if (modal == null) return;
    modal.classList.add('active');
    overlay.classList.add('active');
};

function closeModal(modal) {
    if (modal == null) return;
    modal.classList.remove('active');
    overlay.classList.remove('active');
};


populateLibrary();
console.log(myLibrary);


// NEXT STEPS:
// ---DONE --- 1. INSTEAD OF THE FORM ALWAYS BEING ON THE top, MAKE IT A BUTTON THAT BRINGS UP A MODAL CONTAINING THE FORM.
// ---DONE --- 2. ADD THE ABILITY TO CHANGE THE READ STATUS OF EACH Book.
// 3. STYLING: MAKE IT SNAZZY...BOOTSTRAP?
// 4. FIGURE OUT LOCAL Storage. FIND THE VIDEO USED LAST TIME IF NEEDED ( KEEP READING THROUGH THE ODIN PROJECT AND COMPLETE THIS STEP AT THE APPROPRIATE TIME)