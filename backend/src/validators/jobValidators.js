const { body } = require("express-validator");

exports.createJobValidator = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ max: 100 })
    .withMessage("Title cannot exceed 100 characters"),
  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ max: 1000 })
    .withMessage("Description cannot exceed 1000 characters"),
  body("category")
    .optional()
    .isIn(["Plumbing", "Electrical", "Painting", "Joinery", "Other"])
    .withMessage("Invalid category"),
  body("contactEmail")
    .optional({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email address")
    .normalizeEmail(),
];

exports.updateJobValidator = [
  body("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Title cannot be empty")
    .isLength({ max: 100 })
    .withMessage("Title cannot exceed 100 characters"),
  body("description")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Description cannot be empty")
    .isLength({ max: 1000 })
    .withMessage("Description cannot exceed 1000 characters"),
  body("category")
    .optional()
    .isIn(["Plumbing", "Electrical", "Painting", "Joinery", "Other"])
    .withMessage("Invalid category"),
  body("contactEmail")
    .optional({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email address")
    .normalizeEmail(),
];

exports.updateStatusValidator = [
  body("status")
    .notEmpty()
    .withMessage("Status is required")
    .isIn(["Open", "In Progress", "Closed"])
    .withMessage("Status must be Open, In Progress, or Closed"),
];
