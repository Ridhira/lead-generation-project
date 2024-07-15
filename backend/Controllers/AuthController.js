const jwt = require("jsonwebtoken");
const { ERRORS } = require("../config/config");
const helper = require("../utilities/userHelper");
const utilFn = require("../utilities/index");

let fn = [];

// @ COUNT       --> 1
// @ DESCRIPTION --> User Login
// @ ROUTE       --> auth/login
// @ METHOD      --> POST
fn.login = async (req) => {
  return new Promise(async (resolve) => {
    let input = req.body;
    let inValid = false;
    inValid = await utilFn.IsEmptyObject(input);

    if (inValid) {
      return resolve({
        status: ERRORS.NOT_FOUND,
        statusText: "Invalid credentials",
      });
    }

    let modal = JSON.parse(JSON.stringify(input));

    let result = await helper.FindUser(req);

    if (result.status !== ERRORS.OK) {
      return resolve({
        status: ERRORS.FAILURE,
        statusText: "Invalid credentials",
      });
    }

    let userInfo = result.data;

    let pwsValid = await utilFn.ComparePassword(
      modal.password,
      userInfo[0].password
    );

    if (!pwsValid) {
      return resolve({
        status: ERRORS.BAD_REQUEST,
        statusText: "Invalid credentials",
      });
    }

    const jwtToken = jwt.sign(
      {
        email_address: modal.email_address,
        user_id: userInfo[0].user_id,
        name: userInfo[0].name,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    let data = {
      message: "Login successfully",
      success: true,
      authToken: jwtToken,
      email_address: userInfo[0].email_address,
      name: userInfo[0].name,
      user_id: userInfo[0].user_id,
    };

    return resolve(data);
  });
};

// // # COUNT       --> 2
// // # DESCRIPTION --> User Signup
// // # ROUTE       --> auth/signup
// // # METHOD      --> POST
fn.signup = async (req, res) => {
  return new Promise(async (resolve) => {
    let input = req.body;

    let modal = JSON.parse(JSON.stringify(input));
    delete modal["password"];

    let resultFindUser = await helper.FindUser(req);

    let result;

    if (
      resultFindUser.status === ERRORS.OK &&
      resultFindUser.data.length === 0
    ) {
      result = await helper.UserSignup(req);
    } else {
      result = {
        status: ERRORS.DUPLICATE_ENTRY,
        statusText: "Email address already exist",
      };
    }

    return resolve(result);
  });
};

// // $ COUNT       --> 3
// // $ DESCRIPTION --> Change User Password
// // $ ROUTE       --> auth/update-password
// // $ METHOD      --> put

fn.updatePassword = async (req, res) => {
  return new Promise(async (resolve) => {
    const input = req.body;
    let modal = JSON.parse(JSON.stringify(input));

    let resultFindUser = await helper.FindUser(req);

    if (
      resultFindUser.status !== ERRORS.OK ||
      resultFindUser.data.length === 0
    ) {
      return resolve({
        status: ERRORS.BAD_REQUEST,
        statusText: "Invalid credentials",
      });
    }

    let userInfo = resultFindUser.data;

    let pwsValid = await utilFn.ComparePassword(
      modal.oldPassword,
      userInfo[0].password
    );

    if (!pwsValid) {
      return resolve({
        status: ERRORS.BAD_REQUEST,
        statusText: "Incorrect Old Password",
      });
    }

    let pwd = await utilFn.CryptPassword(modal.newPassword);

    const obj = {
      body: { password: pwd.data, user_id: req.user.id },
    };

    let result = await helper.UpdateUser(obj);
    return resolve(result);
  });
};

// // ! COUNT       --> 4
// // ! DESCRIPTION --> Send OTP to user email
// // ! ROUTE       --> auth/send-otp
// // ! METHOD      --> POST
fn.sendOtp = async (req, res) => {
  return new Promise(async (resolve) => {
    let resultFindUser = await helper.FindUser(req);
    if (
      resultFindUser.status !== ERRORS.OK ||
      resultFindUser.data.length === 0
    ) {
      return resolve({
        status: ERRORS.BAD_REQUEST,
        statusText: "Invalid Email address",
      });
    } else {
      let otp = await utilFn.GenerateUniqueOTP();
      const obj = {
        body: { otp: otp, user_id: resultFindUser.data[0].user_id },
      };

      let result = await helper.UpdateUser(obj);

      if (result.status === ERRORS.OK) {
        return resolve({
          message: "OTP sent successfully",
          success: true,
          otp: otp,
          status: ERRORS.OK,
        });
      } else {
        resolve({
          status: ERRORS.INTERNAL_SERVER_ERROR,
          statusText: "Server Error. Try Again Later",
        });
      }
    }
  });
};

// // @ COUNT       --> 5
// // @DESCRIPTION --> reset user password
// // @ ROUTE      --> auth/reset-password
// // @ METHOD     --> PUT
fn.resetPassword = async (req, res) => {
  return new Promise(async (resolve) => {
    let input = req.body;
    let modal = JSON.parse(JSON.stringify(input));
    let resultFindUser = await helper.FindUser(req);
    if (
      resultFindUser.status !== ERRORS.OK ||
      resultFindUser.data.length === 0
    ) {
      return resolve({
        status: ERRORS.BAD_REQUEST,
        statusText: "Invalid Email address",
      });
    } else {
      let pwd = await utilFn.CryptPassword(modal.newPassword);
      let otp = await utilFn.GenerateUniqueOTP();
      const obj = {
        body: {
          otp: otp,
          user_id: resultFindUser.data[0].user_id,
          password: pwd.password,
        },
      };

      let result = await helper.UpdateUser(obj);

      if (result.status === ERRORS.OK) {
        return resolve({
          message: "Password Updated Successfully",
          success: true,
          status: ERRORS.OK,
        });
      } else {
        resolve({
          status: ERRORS.INTERNAL_SERVER_ERROR,
          statusText: "Server Error. Try Again Later",
        });
      }
    }
  });
};

module.exports = fn;
