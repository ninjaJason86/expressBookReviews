const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customerRoutes = require('./router/auth_users.js').authenticated;
const generalRoutes = require('./router/general.js').general;

const app = express();

app.use(express.json());

app.use("/customer", session({ secret: "fingerprint_customer", resave: true, saveUninitialized: true }))

app.use("/customer/auth/*", function auth(req, res, next) {
    //Write the authenication mechanism here
});

const PORT = 5000;

app.use("/customer", customerRoutes);
app.use("/", generalRoutes);

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
