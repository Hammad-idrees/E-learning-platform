import Joi from "joi";

export default {
  updateProfile: Joi.object({
    firstName: Joi.string().trim().min(2).max(30),
    lastName: Joi.string().trim().min(2).max(30),
    phone: Joi.string().pattern(/^\+?[0-9\s\-]{7,20}$/),
    country: Joi.string(),
  }),

  changePassword: Joi.object({
    currentPassword: Joi.string().required(),
    newPassword: Joi.string()
      .min(8)
      .regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])/)
      .required()
      .messages({
        "string.pattern.base":
          "Password must contain at least 1 number and 1 special character",
      }),
  }),
};
