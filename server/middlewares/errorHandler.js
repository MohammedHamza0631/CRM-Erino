export const errorHandler = (err, req, res, next) => {
  console.error("Error:", err.message);
  // Empty First Name (required violation)
  if (err.message.includes("first_name")) {
    return res.status(400).json({
      status: "error",
      message: "First name is required.",
    });
  }
  // Duplicate email (unique violation)
  if (err.code === "23505" && err.constraint.includes("contacts_email_key")) {
    return res.status(409).json({
      status: "error",
      message: "Email already exists. Please use a different email.",
    });
  }

  // Phone number format violation (check constraint)
  if (err.code === "23514" && err.constraint === "phone_number_format") {
    return res.status(400).json({
      status: "error",
      message: "Phone number must be between 10 to 15 digits.",
    });
  }

  // Invalid email format (fallback check, if not caught by Joi validation)
  if (err.code === "22P02" || err.message.includes("email")) {
    return res.status(400).json({
      status: "error",
      message: "Invalid email format. Please provide a valid email address.",
    });
  }

  // Invalid input format (e.g., wrong data type)
  if (err.code === "22P02") {
    return res.status(400).json({
      status: "error",
      message: "Invalid input format. Please check your data.",
    });
  }

  // Default error response
  res.status(500).json({
    status: "error",
    message: "Internal Server Error. Please try again later.",
  });
};
