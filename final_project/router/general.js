const express = require('express');
const books = require("./booksdb.js");
const { users, userExist } = require("./auth_users.js");
const public_users = express.Router();

public_users.post("/register", (request, response) => {
  const { username, password } = request.body;

  if (!username || !password) {
    return response.status(401).json({ message: "Unable to register user." });
  }

  if (userExist(username)) {
    return response.status(401).json({ message: "User already exists!" });
  }

  users.push({ "username": username, "password": password });
  return response.status(200).json({ message: "User successfully registered. Now you can login" });
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
  const { isbn } = request.params;
  const book = books[isbn];

  if (!book) {
    return response.status(404).json({ message: "Book not found" });
  }

  return response.status(200).send(JSON.stringify(book.reviews, null, 2));
});

module.exports.general = public_users;
