const Users = require("../users/users-model");

const { userSchema, postSchema } = require("./validationSchema");

function logger(req, res, next) {
	console.log(`${req.method}, ${req.baseUrl}, ${new Date().toUTCString()}`);
	next();
}

async function validateUserId(req, res, next) {
	try {
		const user = await Users.getById(req.params.id);
		if (!user) {
			next({
				status: 404,
				message: `User with ID ${req.params.id} not found`,
			});
		} else {
			req.user = user;
			next();
		}
	} catch (err) {
		next(err);
	}
}

async function validateUser(req, res, next) {
	try {
		req.body = await userSchema.validateAsync(req.body, {
			stripUnknown: true,
		});
		next();
	} catch (err) {
		next({ status: 400, message: err.details[0].message });
	}
}

async function validatePost(req, res, next) {
	try {
		req.body = await postSchema.validateAsync(req.body, {
			stripUnknown: true,
		});
		next();
	} catch (err) {
		next({ status: 400, message: err.details[0].message });
	}
}

module.exports = {
	logger,
	validateUserId,
	validateUser,
	validatePost,
};
