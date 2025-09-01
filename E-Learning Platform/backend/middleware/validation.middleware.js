import Joi from "joi";

// Generic validation middleware
export const validate = (schema, property = "body") => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property], {
      abortEarly: false,
      allowUnknown: false,
    });

    if (error) {
      const errors = {};
      error.details.forEach((err) => {
        errors[err.path[0]] = err.message.replace(/"/g, "");
      });
      return res.status(422).json({ errors });
    }
    next();
  };
};

export default validate;
