function getBooksFromStorage() {
    return JSON.parse(localStorage.getItem('books')) || [];
}

function saveBooksToStorage(books) {
    localStorage.setItem('books', JSON.stringify(books));
}

document.addEventListener('DOMContentLoaded', function () {
    renderBooks();
});

document.getElementById('bookForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const title = document.getElementById('bookFormTitle').value;
    const author = document.getElementById('bookFormAuthor').value;
    const year = parseInt(document.getElementById('bookFormYear').value);
    const isComplete = document.getElementById('bookFormIsComplete').checked;
    const id = new Date().getTime();

    const newBook = {
        id,
        title,
        author,
        year,
        isComplete,
    };

    const books = getBooksFromStorage();
    books.push(newBook);
    saveBooksToStorage(books);

    renderBooks();

    document.getElementById('bookForm').reset();
});

function renderBooks() {
    const incompleteBookList = document.getElementById('incompleteBookList');
    const completeBookList = document.getElementById('completeBookList');

    incompleteBookList.innerHTML = '';
    completeBookList.innerHTML = '';

    const books = getBooksFromStorage();

    books.forEach(book => {
        const bookElement = document.createElement('div');
        bookElement.setAttribute('data-bookid', book.id);
        bookElement.setAttribute('data-testid', 'bookItem');
        bookElement.innerHTML = `
            <h3 data-testid="bookItemTitle">${book.title}</h3>
            <p data-testid="bookItemAuthor">Penulis: ${book.author}</p>
            <p data-testid="bookItemYear">Tahun: ${book.year}</p>
            <div>
                <button data-testid="bookItemIsCompleteButton">${book.isComplete ? 'Belum selesai dibaca' : 'Selesai dibaca'}</button>
                <button data-testid="bookItemDeleteButton">Hapus Buku</button>
                <button data-testid="bookItemEditButton">Edit Buku</button>
            </div>
        `;

        if (book.isComplete) {
            completeBookList.appendChild(bookElement);
        } else {
            incompleteBookList.appendChild(bookElement);
        }

        bookElement.querySelector('[data-testid="bookItemIsCompleteButton"]').addEventListener('click', () => toggleBookStatus(book.id));
        bookElement.querySelector('[data-testid="bookItemDeleteButton"]').addEventListener('click', () => deleteBook(book.id));
    });
}

function toggleBookStatus(bookId) {
    const books = getBooksFromStorage();
    const book = books.find(b => b.id === bookId);
    if (book) {
        book.isComplete = !book.isComplete;
        saveBooksToStorage(books);
        renderBooks();
    }
}

function deleteBook(bookId) {
    let books = getBooksFromStorage();
    books = books.filter(book => book.id !== bookId);
    saveBooksToStorage(books);
    renderBooks();
}


document.getElementById('searchBook').addEventListener('submit', function (event) {
    event.preventDefault();
    const query = document.getElementById('searchBookTitle').value.toLowerCase();
    const books = getBooksFromStorage();
    const filteredBooks = books.filter(book => book.title.toLowerCase().includes(query));
    renderFilteredBooks(filteredBooks);
});


function renderFilteredBooks(books) {
    const incompleteBookList = document.getElementById('incompleteBookList');
    const completeBookList = document.getElementById('completeBookList');
    incompleteBookList.innerHTML = '';
    completeBookList.innerHTML = '';

    books.forEach(book => {
        const bookElement = document.createElement('div');
        bookElement.setAttribute('data-bookid', book.id);
        bookElement.setAttribute('data-testid', 'bookItem');
        bookElement.innerHTML = `
            <h3 data-testid="bookItemTitle">${book.title}</h3>
            <p data-testid="bookItemAuthor">Penulis: ${book.author}</p>
            <p data-testid="bookItemYear">Tahun: ${book.year}</p>
            <div>
                <button data-testid="bookItemIsCompleteButton">${book.isComplete ? 'Belum selesai dibaca' : 'Selesai dibaca'}</button>
                <button data-testid="bookItemDeleteButton">Hapus Buku</button>
                <button data-testid="bookItemEditButton">Edit Buku</button>
            </div>
        `;

        if (book.isComplete) {
            completeBookList.appendChild(bookElement);
        } else {
            incompleteBookList.appendChild(bookElement);
        }
        bookElement.querySelector('[data-testid="bookItemIsCompleteButton"]').addEventListener('click', () => toggleBookStatus(book.id));
        bookElement.querySelector('[data-testid="bookItemDeleteButton"]').addEventListener('click', () => deleteBook(book.id));
    });
}
