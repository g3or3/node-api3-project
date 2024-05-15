const express = require("express");

const Users = require("./users-model");

const Posts = require("../posts/posts-model");

const {
	validateUserId,
	validateUser,
	validatePost,
	logger,
} = require("../middleware/middleware");

const router = express.Router();

router.use(logger);

router.get("/", async (req, res, next) => {
	try {
		res.render("users", {
			users: await Users.get(),
		});
	} catch (err) {
		next(err);
	}
});

router.get("/update-user/:id", async (req, res) => {
	const user = await Users.getById(req.params.id);
	res.render("update", {
		id: req.params.id,
		userName: user.name,
	});
});

router.get("/:id", validateUserId, (req, res) => {
	res.json(req.user);
});

router.post("/", validateUser, async (req, res, next) => {
	try {
		await Users.insert(req.body);
		res.render("users", {
			users: await Users.get(),
		});
	} catch (err) {
		next(err);
	}
});

router.put("/:id", validateUserId, validateUser, async (req, res, next) => {
	try {
		await Users.update(req.user.id, req.body);
		res.render("users", {
			users: await Users.get(),
		});
	} catch (err) {
		next(err);
	}
});

router.delete("/:id", validateUserId, async (req, res, next) => {
	try {
		await Users.remove(req.params.id);
		res.render("users", {
			users: await Users.get(),
		});
	} catch (err) {
		next(err);
	}
});

router.get("/:id/posts", validateUserId, async (req, res, next) => {
	try {
		res.render("posts", {
			id: req.params.id,
			posts: await Users.getUserPosts(req.params.id),
		});
	} catch (err) {
		next(err);
	}
});

router.post("/:id/posts", validateUserId, validatePost, async (req, res, next) => {
	try {
		const newPost = { user_id: req.params.id, ...req.body };
		await Posts.insert(newPost);
		res.render("posts", {
			id: req.params.id,
			posts: await Users.getUserPosts(req.params.id),
		});
	} catch (err) {
		next(err);
	}
});

router.use((err, req, res, next) => {
	res.status(err.status || 500).json({
		note: "Something went wrong in the router",
		message: err.message,
	});
});

module.exports = router;
