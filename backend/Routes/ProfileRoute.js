//  ! IMPORTS
const express = require("express");
// const {
//   signupValidation,
//   loginValidation,
//   updatePasswordValidation,
//   emailValidation,
//   otpValidation,
// } = require("../Middlewares/AuthValidation");

const { ensureAuthenticated } = require("../Middlewares/UserAuth");

const {
  CreateUserProfile,
  GetUserProfile,
} = require("../Controllers/ProfileController");

const router = express.Router();

// $ COUNT       --> 1
// $ DESCRIPTION --> CREATE USER PROFILE
// $ ROUTE       --> profile/create-user-profile
// $ METHOD      --> post

router.post("/create-user-profile", ensureAuthenticated, CreateUserProfile);
router.post("/get-user-profile", ensureAuthenticated, GetUserProfile);

module.exports = router;
