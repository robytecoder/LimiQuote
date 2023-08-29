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
  },
  name: {},
  surname: {},
  bio: {},
  password: {
    exists: {
      errorMessage: "Password is required",
    },
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
