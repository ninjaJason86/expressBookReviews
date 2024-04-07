const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customerRoutes = require('./router/auth_users.js').authenticated;
const generalRoutes = require('./router/general.js').general;

const app = express();

app.use(express.json());

app.use("/customer", session({ secret: "fingerprint_customer", resave: true, saveUninitialized: true }))

app.use("/customer/auth/*", function auth(request, response, next) {
    if (!request.session["authorization"]) {
        return response.status(403).json({ message: "User not logged in" })
    }

    const token = request.session["authorization"]['accessToken'];
    jwt.verify(token, "access", (error, user) => {
        if (error) {
            return response.status(403).json({ message: "User not authenticated" })
        }

        request["user"] = user;
        next();
    });
});

const PORT = 5000;

app.use("/customer", customerRoutes);
app.use("/", generalRoutes);

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
