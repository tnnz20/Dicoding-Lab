const UNFINISHED_LIST_BOOK_ID = 'on-going';
const FINISHED_LIST_BOOK_ID = 'finished';
const BOOK_ITEMID = 'itemId';


function addBookShelf() {
    const unFinishedBookList = document.getElementById(UNFINISHED_LIST_BOOK_ID);
    const FinishedBookList = document.getElementById(FINISHED_LIST_BOOK_ID);

    const book_value = document.getElementById('title').value;
    const author_value = document.getElementById('author').value;
    const year_value = document.getElementById('year').value;
    const check_value = document.getElementById('checkbox').checked;

    const book = createList(book_value, author_value, year_value, check_value);
    const bookObject = composeBookObject(book_value, author_value, year_value, check_value);
    book[BOOK_ITEMID] = bookObject.id
    books.push(bookObject);
    if (check_value) {
        FinishedBookList.append(book)
    } else {
        unFinishedBookList.append(book)
    }

    updateDataToStorage();
}

function createList(title, author, year, isCompleted) {
    const textTitle = document.createElement('h2');
    textTitle.classList.add('innerTitle');
    textTitle.innerText = title;

    const textAuthor = document.createElement('p');
    textAuthor.classList.add('innerAuthor')
    textAuthor.innerText = author

    const textYear = document.createElement('p');
    textYear.classList.add('innerYear')
    textYear.innerText = year


    const innerContainer = document.createElement('div');
    innerContainer.classList.add('inner');
    innerContainer.append(textTitle, textAuthor, textYear);

    const container = document.createElement('div');
    container.classList.add('item', 'shadow');
    container.append(innerContainer);

    if (isCompleted) {
        container.append(
            buttonDelete(),
            buttonUndo()
        );
    } else {
        container.append(
            buttonDelete(),
            buttonCheck()
        );
    }
    return container;
}

function addToFinishedBook(bookElement) {
    const listCompleted = document.getElementById(FINISHED_LIST_BOOK_ID);
    const bookTitle = bookElement.querySelector('.inner > h2').innerText;
    const bookAuthor = bookElement.querySelector('.innerAuthor').innerText;
    const bookYear = bookElement.querySelector('.innerYear').innerText;

    const newBook = createList(bookTitle, bookAuthor, bookYear, true);

    const book = findBook(bookElement[BOOK_ITEMID]);
    book.isCompleted = true;
    newBook[BOOK_ITEMID] = book.id
    listCompleted.append(newBook);
    bookElement.remove();

    updateDataToStorage();
}

function removeBookFromList(bookElement) {
    const bookPostion = findBookIndex(bookElement[BOOK_ITEMID]);
    books.splice(bookPostion, 1);
    bookElement.remove();

    updateDataToStorage();
}

function undoBookFromFinished(bookElement) {
    const listUnCompleted = document.getElementById(UNFINISHED_LIST_BOOK_ID);
    const bookTitle = bookElement.querySelector('.inner > h2').innerText;
    const bookAuthor = bookElement.querySelector('.innerAuthor').innerText;
    const bookYear = bookElement.querySelector('.innerYear').innerText;

    const newBook = createList(bookTitle, bookAuthor, bookYear, false);
    const book = findBook(bookElement[BOOK_ITEMID]);
    book.isCompleted = false;
    newBook[BOOK_ITEMID] = book.id
    listUnCompleted.append(newBook);
    bookElement.remove();

    updateDataToStorage();
}

function refreshDataFromBooks() {
    const listUncompleted = document.getElementById(UNFINISHED_LIST_BOOK_ID);
    let listCompleted = document.getElementById(FINISHED_LIST_BOOK_ID);

    for (book of books) {
        const newBook = createList(book.title, book.author, book.year, book.isCompleted);
        newBook[BOOK_ITEMID] = book.id;

        if (book.isCompleted == true) {
            listCompleted.append(newBook);
        } else {
            listUncompleted.append(newBook);
        }
    }
}

function searchBook(query) {
    const unFinishedBookList = document.getElementById(UNFINISHED_LIST_BOOK_ID);
    const FinishedBookList = document.getElementById(FINISHED_LIST_BOOK_ID);

    const bookFromStorage = JSON.parse(localStorage.getItem(STORAGE_KEY));
    let search = bookFromStorage.filter((n) => n.title.toLowerCase().includes(query.toLowerCase()));

    console.log(bookFromStorage)
    unFinishedBookList.innerHTML = '';
    FinishedBookList.innerHTML = '';

    for (let book of search) {
        const textTitle = document.createElement('h2');
        textTitle.classList.add('innerTitle');
        textTitle.innerText = book.title;

        const textAuthor = document.createElement('p');
        textAuthor.classList.add('innerAuthor')
        textAuthor.innerText = book.author

        const textYear = document.createElement('p');
        textYear.classList.add('innerYear')
        textYear.innerText = book.year


        const innerContainer = document.createElement('div');
        innerContainer.classList.add('inner');
        innerContainer.append(textTitle, textAuthor, textYear);

        const container = document.createElement('div');
        container.classList.add('item', 'shadow');
  
        const isCompleted = book.isCompleted;
        if (isCompleted) {
            container.append(innerContainer);
            container.append(
                buttonDelete(),
                buttonUndo()
            );
            FinishedBookList.append(container);
        } else {
            container.append(innerContainer);
            container.append(
                buttonDelete(),
                buttonCheck()
            );
            unFinishedBookList.append(container);
        }
    }
}

document.getElementById('searchBook').addEventListener('input', () => {
    const searchInput = document.getElementById('searchBook').value;
    searchBook(searchInput)
})

// function for button
function createButton(buttonTypeClass, eventListener) {
    const button = document.createElement('button');
    button.classList.add(buttonTypeClass);
    button.addEventListener('click', function (event) {
        eventListener(event)
    });
    return button;
};

function buttonCheck() {
    return createButton('check-button', function (event) {
        addToFinishedBook(event.target.parentElement);
    });
};

function buttonDelete() {
    return createButton('delete-button', function (event) {
        removeBookFromList(event.target.parentElement);
    });
};

function buttonUndo() {
    return createButton('undo-button', function (event) {
        undoBookFromFinished(event.target.parentElement);
    });
};