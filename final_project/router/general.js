const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (request, response) => {
  //Write your code here
  return response.status(300).json({ message: "Yet to be implemented" });
});

// Get the book list available in the shop
public_users.get('/', function (request, response) {
  return response.status(200).send(JSON.stringify(books, null, 2));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (request, response) {
  const { isbn } = request.params;
  const book = books[isbn];

  if (!book) {
    return response.status(404).json({ message: "Book not found" });
  }

  return response.status(200).send(book);
});

// Get book details based on author
public_users.get('/author/:author', function (request, response) {
  const { author } = request.params;
  const booksByAuthor = Object.values(books).filter((item) => item.author === author);

  return response.status(200).send(JSON.stringify(booksByAuthor, null, 3));
});

// Get all books based on title
public_users.get('/title/:title', function (request, response) {
  const { title } = request.params;
  const booksByAuthor = Object.values(books).filter((item) => item.title === title);

  return response.status(200).send(JSON.stringify(booksByAuthor, null, 3));
});

//  Get book review
public_users.get('/review/:isbn', function (request, response) {
  //Write your code here
  return response.status(300).json({ message: "Yet to be implemented" });
});

module.exports.general = public_users;
