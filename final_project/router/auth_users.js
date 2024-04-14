const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const registered_users = express.Router();

let users = [];

const userExist = (username) => {
  const userWithSameName = users.find((user) => user.username === username);

  return !!userWithSameName
}

const authenticatedUser = (username, password) => {
  const userWithSameNameAndPassword = users.find((user) => user.username === username && user.password === password);

  return !!userWithSameNameAndPassword
}

//only registered users can login
registered_users.post("/login", (request, response) => {
  const { username, password } = request.body;

  if (!authenticatedUser(username, password)) {
    return response.status(208).json({ message: "Invalid Login. Check username and password" });
  }

  if (!authenticatedUser(username, password)) {
    return response.status(40)
  }

  const accessToken = jwt.sign(
    {
      username,
      password,
    },
    'access',
    { expiresIn: 60 }
  );

  // @ts-ignore
  request.session["authorization"] = { accessToken }
  return response.status(200).send("Customer successfully logged in");
});

// Add a book review
registered_users.put("/auth/review/:isbn", (request, response) => {
  const { params: { isbn }, body: { review } } = request;

  if (!review) {
    return response.status(401).json({ message: "Invalid body" });
  }

  if (!books[isbn]) {
    return response.status(404).json({ message: "Book not found" });
  }

  const { username } = request["user"];

  books[isbn].reviews[username] = review;

  return response.status(200).json({ message: `The review for the book with ISBN "${isbn}" has been added/updated` });
});

// delete a book review
registered_users.delete("/auth/review/:isbn", (request, response) => {
  const { params: { isbn } } = request;

  if (!books[isbn]) {
    return response.status(404).json({ message: "Book not found" });
  }

  const { username } = request["user"];

  delete books[isbn].reviews[username];

  return response.status(200).json({ message: `Review for book with title "${books[isbn].title}" deleted successfully` });
});

module.exports.users = users;


module.exports = {
  authenticated: registered_users,
  userExist,
  users,
}