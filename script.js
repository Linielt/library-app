function Book(title, author, pages, hasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;

    this.toggleHasRead = function() {
        this.hasRead = !this.hasRead;
    }
}

let myLibrary = [
    new Book("Atomic Habits", "James Clear", 243, true),
    new Book("Do Androids Dream of Electric Sheep?", "Phillip K. Dick", 210, false),
];

displayBooks();

const dialog = document.querySelector("#add-new-book-dialog");
const newBookButton = document.querySelector(".new-book-button");
const closeButton = document.querySelector(".close-button");
const submitButton = document.querySelector(".submit-button");

newBookButton.addEventListener("click", () => {
    dialog.showModal();
});

closeButton.addEventListener("click", () => {
    dialog.close();
});

submitButton.addEventListener("click", submitButtonClick);

function submitButtonClick(event) {
    const bookName = document.querySelector("#bookName").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const hasRead = document.querySelector("#hasRead").checked;

    if (hasRead) {
        addBookToLibrary(new Book(bookName, author, pages, "read"));
    }
    else {
        addBookToLibrary(new Book(bookName, author, pages, "not read"));
    }
    event.preventDefault();
    dialog.close();
}

const inputs = document.querySelectorAll("input");

inputs.forEach(input => {
    input.addEventListener(
        "invalid",
        event => {
            input.classList.add("error");
        },
        false
    );
});

function addBookToLibrary(book) {
    myLibrary.push(book);
    document.querySelector(".books").innerHTML = "";
    displayBooks();
}

function removeBookFromLibrary(e) {
    myLibrary.splice(e.target.dataset.indexNumber, 1);
    displayBooks();
    e.preventDefault();
}

function toggleHasReadEvent(e) {
    myLibrary[e.target.dataset.indexNumber].toggleHasRead();
    displayBooks();
}

function displayBooks() {
    let index = 0;

    const books = document.querySelector(".books");
    while (books.firstChild) {
        books.removeChild(books.lastChild);
    }

    myLibrary.forEach(book => {
        const bookToDisplay = document.createElement('div');
        // bookToDisplay.dataset.indexNumber = index;
        bookToDisplay.className = "card";
        
        const bookTitle = document.createElement('h2');
        bookTitle.textContent = book.title;
        bookTitle.className = "title";
        bookToDisplay.appendChild(bookTitle);

        const bookAuthor = document.createElement('p');
        bookAuthor.textContent = book.author;
        bookAuthor.className = "author";
        bookToDisplay.appendChild(bookAuthor);

        const bookPages = document.createElement('p');
        bookPages.textContent = book.pages + " pages";
        bookPages.className = "pages";
        bookToDisplay.appendChild(bookPages);

        const hasRead = document.createElement('button');
        if (book.hasRead) {
            hasRead.textContent = "Read";
            hasRead.style.backgroundColor = "rgb(190, 242, 100";
        }
        else {
            hasRead.textContent = "Not read";
            hasRead.style.backgroundColor = "rgb(248, 113, 133)";
        }

        hasRead.style.border = "none";
        hasRead.style.padding = "1em";
        hasRead.style.borderRadius = "1em";
        hasRead.style.width = "100%";
        hasRead.className = "hasRead";
        hasRead.dataset.indexNumber = index;

        hasRead.addEventListener("click", toggleHasReadEvent);

        bookToDisplay.appendChild(hasRead);

        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.style.border = "none";
        removeButton.style.backgroundColor = "rgb(220, 38, 38)";
        removeButton.style.padding = "1em";
        removeButton.style.borderRadius = "1em";
        removeButton.style.width = "100%";
        removeButton.className = "removeButton";
        removeButton.dataset.indexNumber = index;

        removeButton.addEventListener("click", removeBookFromLibrary);

        bookToDisplay.appendChild(removeButton);

        document.querySelector(".books").appendChild(bookToDisplay);
        index++;
    });
}