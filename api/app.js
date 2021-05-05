const express = require("express");

const usersRouter = require("./users/users-router");

const app = express();

app.use(express.json());

app.use("/api/users", usersRouter);

// global middlewares and the user's router need to be connected here

app.get("/", (req, res) => {
	res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = app;
