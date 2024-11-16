import Joi from "joi";

export const validateContact = (req, res, next) => {
  const schema = Joi.object({
    first_name: Joi.string().trim().min(1).max(100).required().messages({
      "string.empty": "First name is required.",
      "string.min": "First name cannot be empty.",
      "any.required": "First name is required.",
    }),
    last_name: Joi.string().min(2).max(100).optional(),
    email: Joi.string()
      .pattern(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/)
      .required()
      .messages({
        "string.pattern.base":
          "Invalid email format. Please provide a valid email address.",
        "string.empty": "Email is required.",
      }),
    phone_number: Joi.string()
      .pattern(/^[0-9]{10,15}$/)
      .required()
      .messages({
        "string.pattern.base": "Phone number must be between 10 to 15 digits.",
        "string.empty": "Phone number is required.",
      }),
    company: Joi.string().max(100).optional(),
    job_title: Joi.string().max(100).optional(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      status: "error",
      message: error.details[0].message,
    });
  }

  next();
};
