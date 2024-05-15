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
		res.json(await Users.get());
	} catch (err) {
		next(err);
	}
});

router.get("/:id", validateUserId, (req, res) => {
	res.json(req.user);
});

router.post("/", validateUser, async (req, res, next) => {
	try {
		res.json(await Users.insert(req.body));
	} catch (err) {
		next(err);
	}
});

router.put("/:id", validateUserId, validateUser, async (req, res, next) => {
	try {
		await Users.update(req.user.id, req.body);
		res.json({ id: req.user.id, ...req.body });
	} catch (err) {
		next(err);
	}
});

router.delete("/:id", validateUserId, async (req, res, next) => {
	try {
		await Users.remove(req.params.id);
		res.json(req.user);
	} catch (err) {
		next(err);
	}
});

router.get("/:id/posts", validateUserId, async (req, res, next) => {
	try {
		res.json(await Users.getUserPosts(req.params.id));
	} catch (err) {
		next(err);
	}
});

router.post("/:id/posts", validateUserId, validatePost, async (req, res, next) => {
	try {
		const newPost = { user_id: req.params.id, ...req.body };
		res.json(await Posts.insert(newPost));
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
