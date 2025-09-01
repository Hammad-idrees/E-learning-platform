import Joi from "joi";

// Password rules: min 8 chars, 1 number, 1 symbol
const passwordRules = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;

export default {
  signup: Joi.object({
    firstName: Joi.string().trim().min(2).max(30).required(),
    lastName: Joi.string().trim().min(2).max(30).required(),
    username: Joi.string()
      .lowercase()
      .min(3)
      .max(20)
      .regex(/^[a-z0-9_]+$/)
      .required()
      .messages({
        "string.pattern.base":
          "Username can only contain letters, numbers, and underscores",
      }),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().regex(passwordRules).required().messages({
      "string.pattern.base":
        "Password must be 8+ chars with 1 number and 1 symbol",
    }),
    confirmPassword: Joi.string()
      .valid(Joi.ref("password"))
      .required()
      .messages({ "any.only": "Passwords do not match" }),
    country: Joi.string().required(),
    phone: Joi.string()
      .pattern(/^\+?[0-9\s\-]{7,20}$/)
      .optional(),
  }),

  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),

  adminLogin: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};
