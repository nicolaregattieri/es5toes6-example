// BOOK CONTRUCTOR
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI CONTRUCTOR

function UI() {}

UI.prototype.addBookToList = function(book) {
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
};

UI.prototype.clearFields = function() {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
};
UI.prototype.showAlert = function(message, className) {
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
};

// delete book
UI.prototype.deleteBook = function(target) {
  if (target.className === "delete") {
    target.parentElement.parentElement.remove();
  }
};
//EVENT LISTENERS

// add event listener to add book

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
  // Show alert
  ui.showAlert("Book removed!", "success");
  e.preventDefault();
});
