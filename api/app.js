const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const methodOverride = require("method-override");

const usersRouter = require("./users/users-router");

const app = express();

const hbs = exphbs.create({
	defaultLayout: "main",
	extname: ".hbs",
	helpers: {
		hello: function () {
			console.log("hello");
		},
	},
});

app.engine("hbs", hbs.engine);

app.set("views", path.join(__dirname, "views"));

app.set("view engine", "hbs");

app.use(methodOverride("_method"));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.render("index"));

app.use("/api/users", usersRouter);

module.exports = app;
