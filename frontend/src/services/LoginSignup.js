import axios from "axios";

// console.log(process.env.REACT_APP_API_URL);

const UserLogin = async (userInfo) => {
  try {
    const res = await axios.post(`http://localhost:8080/auth/login`, {
      email: userInfo.email,
      password: userInfo.password,
    });

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

const UserSignup = async (userInfo) => {
  try {
    const res = await axios.post(`http://localhost:8080/auth/signup`, {
      name: userInfo.userName,
      email: userInfo.email,
      password: userInfo.password,
    });
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

const SendOTP = async (userEmail) => {
  try {
    const res = await axios.post(`http://localhost:8080/auth/send-otp`, {
      email: userEmail,
    });
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

const ResetPassword = async (userInfo, email) => {
  try {
    const res = await axios.put(`http://localhost:8080/auth/reset-password`, {
      email: email,
      otp: userInfo.otp,
      newPassword: userInfo.password,
    });
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

export { UserLogin, UserSignup, SendOTP, ResetPassword };
