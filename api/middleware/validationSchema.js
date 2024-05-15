const Joi = require("joi");

const userSchema = Joi.object({
	name: Joi.string().trim().min(3).max(30).required().messages({
		"any.required": `"missing required name`,
	}),
});

const postSchema = Joi.object({
	text: Joi.string().trim().min(3).max(100).required().messages({
		"any.required": `"missing required text`,
	}),
});

module.exports = {
	userSchema,
	postSchema,
};
