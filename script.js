document.addEventListener('DOMContentLoaded', () => {
    displayBooks();

    const searchInput = document.getElementById('search');
    searchInput.addEventListener('keyup', searchBooks);
});

function getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
        books = [];
    } else {
        books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
}

function displayBooks() {
    const books = getBooks();
    const booksList = document.getElementById('list');

    booksList.innerHTML = '';

    books.forEach((book, index) => {
        let li = document.createElement('li');
        li.textContent = `${book.title} by ${book.author} (${book.genre})`;
        li.onclick = function() {
            showDetails(book);
        };
        booksList.appendChild(li);
    });
}

function addBook() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const genre = document.getElementById('genre').value;

    const book = {
        title: title,
        author: author,
        genre: genre
    };

    const books = getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));

    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('genre').value = '';

    displayBooks();
}

function searchBooks() {
    const query = document.getElementById('search').value.toLowerCase();
    const books = getBooks();
    const filteredBooks = books.filter(book => book.title.toLowerCase().includes(query));

    const booksList = document.getElementById('list');
    booksList.innerHTML = '';

    filteredBooks.forEach((book, index) => {
        let li = document.createElement('li');
        li.textContent = `${book.title} by ${book.author} (${book.genre})`;
        li.onclick = function() {
            showDetails(book);
        };
        booksList.appendChild(li);
    });
}

function showDetails(book) {
    const detailsDiv = document.getElementById('book-details');
    document.getElementById('detail-title').textContent = book.title;
    document.getElementById('detail-author').textContent = book.author;
    document.getElementById('detail-genre').textContent = book.genre;

    detailsDiv.style.display = 'block';
}

function hideDetails() {
    document.getElementById('book-details').style.display = 'none';
}

function submitFeedback() {
    const feedback = document.getElementById('feedback').value;

    if (feedback.trim()) {
        alert('Thank you for your feedback!');
        document.getElementById('feedback').value = '';
    } else {
        alert('Please write something before submitting.');
    }
}
