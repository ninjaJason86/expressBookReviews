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
  return response.status(200).send("User successfully logged in");
});

// Add a book review
registered_users.put("/auth/review/:isbn", (request, response) => {
  //Write your code here
  return response.status(300).json({ message: "Yet to be implemented" });
});

module.exports.users = users;


module.exports = {
  authenticated: registered_users,
  userExist,
  users,
}