const { checkSchema, validationResult } = require("express-validator");

// Schema di validazione per la creazione di un messaggio
const validateMessage = checkSchema({
  text: {
    exists: {
      errorMessage: "Text is required",
      options: { checkFalsy: true },
    },
    isString: { errorMessage: "Text should be a string" },
    trim: true,
    notEmpty: true,
    // escape: true,
  },
});

// Schema di validazione del form di signUp
const validateSignup = checkSchema({
  username: {
    exists: {
      errorMessage: "Username is required",
    },
    isEmail: { errorMessage: "Username should be a valid e-mail address" },
  },
  name: {
    exists: {
      errorMessage: "Name is required",
    },
    isString: { errorMessage: "Name should be a string" },
    trim: true,
    notEmpty: true,
    escape: true,
  },
  surname: {
    exists: {
      errorMessage: "Surname is required",
    },
    isString: { errorMessage: "Surname should be a string" },
    trim: true,
    notEmpty: true,
    escape: true,
  },
  bio: {
    exists: {
      errorMessage: "Bio is required",
    },
    isString: { errorMessage: "Bio should be a string" },
    trim: true,
    notEmpty: true,
    // escape: true,
  },
  password: {
    exists: {
      errorMessage: "Password is required",
    },
    isString: { errorMessage: "Password should be a string" },
    trim: true,
    notEmpty: true,
    isLength: {
      options: { min: 8 },
      errorMessage: "The password must be at least 8 characters",
    },
  },
});

// Schema di validazione del form di signIn
const validateSignin = checkSchema({
  username: {
    exists: {
      errorMessage: "Username is required",
    },
    isEmail: { errorMessage: "Username should be a valid e-mail address" },
  },
  password: {
    exists: {
      errorMessage: "Password is required",
    },
    isString: { errorMessage: "Password should be a string" },
    trim: true,
    notEmpty: true,
    isLength: {
      options: { min: 8 },
      errorMessage: "The password must be at least 8 characters",
    },
  },
});

// Gestione degli errori di validazione
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
