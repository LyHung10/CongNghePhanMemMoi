const express = require('express');
const { createUser, handleLogin, getUser, getAccount } = require('../controllers/userController');
const auth = require('../middleware/auth');
const delay = require('../middleware/delay');

const routerAPI = express.Router();

// Public routes
routerAPI.get("/", (req, res) => {
    return res.status(200).json("Hello world api, nà ní cù rế");
});

routerAPI.post("/register", createUser);
routerAPI.post("/login", handleLogin);

// Private routes
routerAPI.get("/user", auth, getUser);
routerAPI.get("/account", auth, delay, getAccount);

module.exports = routerAPI;
