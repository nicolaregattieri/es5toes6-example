class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book) {
    const list = document.getElementById("book-list");
    //  Create tr element
    const row = document.createElement("tr");
    //   Insert cols
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href='' class='delete'>X</a></td>`;
    list.appendChild(row);
  }
  showAlert(message, className) {
    // create div
    const div = document.createElement("div");
    // add classes
    div.className = `alert ${className}`;
    // add text
    div.appendChild(document.createTextNode(message));
    // get parent
    const container = document.querySelector(".container");
    // get form
    const form = document.querySelector("#book-form");
    // insert alert
    container.insertBefore(div, form);

    //   timeout after 3s
    setTimeout(function() {
      document.querySelector(".alert").remove();
    }, 3000);
  }
  deleteBook(target) {
    if (target.className === "delete") {
      target.parentElement.parentElement.remove();
    }
  }
  clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }
}

class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }

  static displayBooks() {
    const books = Store.getBooks();

    books.map(book => {
      const ui = new UI();
      ui.addBookToList(book);
    });
  }
  static addBook(book) {
    //   Use class name and call  because its an static method
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }
  static removeBook(isbn) {
    const books = Store.getBooks();
    books.forEach(function(book, index) {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem("books", JSON.stringify(books));
  }
}

// DOM LOAD EVENT
document.addEventListener("DOMContentLoaded", Store.displayBooks());

document.getElementById("book-form").addEventListener("submit", function(e) {
  //   Get form values
  const title = document.querySelector("#title").value,
    author = document.querySelector("#author").value,
    isbn = document.querySelector("#isbn").value;

  //   INSTANTIATE A BOOK
  const book = new Book(author, title, isbn);

  //   instantiate ui

  const ui = new UI();

  //   VALIDATE

  if (title === "" || author === "" || isbn === "") {
    //   Error
    ui.showAlert("Please fill in all fields", "error");
  } else {
    //   add book to list

    ui.addBookToList(book);

    // Add book to LS
    Store.addBook(book);
    // show success
    ui.showAlert("Book Added!", "success");
    //   Clear fields
    ui.clearFields();
  }

  e.preventDefault();
});

// Event Listener for delete
document.getElementById("book-list").addEventListener("click", function(e) {
  const ui = new UI();

  // delete book
  ui.deleteBook(e.target);

  //   remove from LS
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  // Show alert
  ui.showAlert("Book removed!", "success");
  e.preventDefault();
});
