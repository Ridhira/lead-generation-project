import axios from "axios";
import helper from "../utility/helper";

const APP_END_POINT = import.meta.env.VITE_APP_API_URL;

const UserLogin = async (userInfo) => {
  try {
    const res = await axios.post(`${APP_END_POINT}auth/login`, {
      email_address: userInfo.email,
      password: userInfo.password,
    });

    return res.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else {
      return {
        success: false,
        message: "Something went wrong. Try Again",
        status: 900,
      };
    }
  }
};

const UserSignup = async (userInfo) => {
  try {
    const res = await axios.post(`${APP_END_POINT}auth/signup`, {
      name: userInfo.userName,
      email_address: userInfo.email,
      password: userInfo.password,
      partner_id: userInfo.partner_id,
    });
    return res.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else {
      return {
        success: false,
        message: "Something went wrong. Try Again",
        status: 900,
      };
    }
  }
};

const SendOTP = async (userEmail) => {
  try {
    const res = await axios.post(`${APP_END_POINT}auth/send-otp`, {
      email_address: userEmail,
    });
    return res.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else {
      return {
        success: false,
        message: "Something went wrong. Try Again",
        status: 900,
      };
    }
  }
};

const ResetPassword = async (userInfo, email) => {
  try {
    const res = await axios.put(`${APP_END_POINT}auth/reset-password`, {
      email_address: email,
      otp: userInfo.otp,
      newPassword: userInfo.password,
    });
    return res.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else {
      return {
        success: false,
        message: "Something went wrong. Try Again",
        status: 900,
      };
    }
  }
};

const UpdateUserPassword = async (userPassword) => {
  try {
    const res = await axios.put(
      `${APP_END_POINT}auth/update-password`,
      {
        email_address: userPassword.email,
        oldPassword: userPassword.oldPassword,
        newPassword: userPassword.newPassword,
      },
      {
        headers: helper.GetTokenHeader(),
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
    if (error.response) {
      return error.response.data;
    } else {
      return {
        success: false,
        message: "Something went wrong. Try Again",
        status: 900,
      };
    }
  }
};

export { UserLogin, UserSignup, SendOTP, ResetPassword, UpdateUserPassword };
