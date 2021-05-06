const Joi = require("joi");

const userSchema = Joi.object({
	name: Joi.string()
		.trim()
		.alphanum()
		.min(3)
		.max(30)
		.required(),
});

const postSchema = Joi.object({
	text: Joi.string()
		.trim()
		.alphanum()
		.min(5)
		.max(100)
		.required(),
});

module.exports = { userSchema, postSchema };
