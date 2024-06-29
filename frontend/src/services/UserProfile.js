import axios from "axios";
import helper from "../utility/helper";
const APP_END_POINT = import.meta.env.VITE_APP_API_URL;

const CreateUserProfile = async (userProfile) => {
  try {
    const res = await axios.post(
      `${APP_END_POINT}profile/create-user-profile`,
      {
        dob: userProfile.dob, // YYYY-MM-DD
        phone: userProfile.phone,
        designation: userProfile.designation,
        description: userProfile.description,
        image: "new entry",
        address: userProfile.address,
      },
      {
        headers: helper.GetTokenHeader(),
      }
    );
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

const GetUserProfile = async () => {
  try {
    const res = await axios.post(
      `${APP_END_POINT}profile/get-user-profile`,
      {
        user_id: helper.GetUserId(),
      },
      {
        headers: helper.GetTokenHeader(),
      }
    );
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

export { CreateUserProfile, GetUserProfile };
