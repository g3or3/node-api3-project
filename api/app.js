const express = require("express");

const usersRouter = require("./users/users-router");

const app = express();

app.use(express.json());

app.use("/api/users", usersRouter);

module.exports = app;
