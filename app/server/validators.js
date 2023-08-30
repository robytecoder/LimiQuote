const { checkSchema, validationResult } = require("express-validator");

const validateMessage = checkSchema({
  text: {
    exists: {
      errorMessage: "Text is required",
      options: { checkFalsy: true },
    },
    isString: { errorMessage: "Text should be a string" },
    trim: true,
    notEmpty: true,
    escape: true,
  },
});

const validateSignup = checkSchema({
  username: {
    exists: {
      errorMessage: "Username is required",
    },
    isString: { errorMessage: "Text should be a string" },
    trim: true,
    notEmpty: true,
    escape: true,
  },
  name: {
    exists: {
      errorMessage: "Name is required",
    },
    isString: { errorMessage: "Text should be a string" },
    trim: true,
    notEmpty: true,
    escape: true,
  },
  surname: {
    exists: {
      errorMessage: "Surname is required",
    },
    isString: { errorMessage: "Text should be a string" },
    trim: true,
    notEmpty: true,
    escape: true,
  },
  bio: {
    exists: {
      errorMessage: "Username is required",
    },
    isString: { errorMessage: "Text should be a string" },
    trim: true,
    notEmpty: true,
    escape: true,
  },
  password: {
    exists: {
      errorMessage: "Password is required",
    },
    isString: { errorMessage: "Text should be a string" },
    trim: true,
    notEmpty: true,
    escape: true,
  },

  // text: {
  //   exists: {
  //     errorMessage: "Text is required",
  //     options: { checkFalsy: true },
  //   },
  //   isString: { errorMessage: "Text should be a string" },
  //   trim: true,
  //   notEmpty: true,
  //   escape: true,
  // },
  // author: {
  //   exists: { errorMessage: "Author is required" },
  //   isString: { errorMessage: "Author should be a string" },
  //   trim: true,
  //   notEmpty: true,
  //   escape: true,
  // },
  // userId: {
  //   exists: { errorMessage: "UserId is required" },
  //   isInt: { errorMessage: "UserId should be a number" },
  // },
});

const validateSignin = checkSchema({
  username: {
    exists: {
      errorMessage: "Username is required",
    },
  },
  password: {
    exists: {
      errorMessage: "Password is required",
    },
  },
});

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map((error) => error.msg),
    });
  }
  next();
};

module.exports = {
  validateMessage,
  validateSignup,
  validateSignin,
  handleValidationErrors,
};
