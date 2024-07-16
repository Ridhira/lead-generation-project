import axios from "axios";
import helper from "../utility/helper";
const APP_END_POINT = import.meta.env.VITE_APP_API_URL;
const APP_NAME = import.meta.env.VITE_APP_NAME;
const CLOUD_NAME = import.meta.env.VITE_APP_CLOUD_NAME;
const IMAGE_URL = import.meta.env.VITE_APP_CLOUD_IMAGE_URL;

const CreateUserProfile = async (userProfile) => {
  const user_id = helper.GetUserId();

  try {
    const res = await axios.post(
      `${APP_END_POINT}profile/create-user-profile`,
      {
        user_id: user_id,
        dob: userProfile?.dob, // YYYY-MM-DD
        phone: userProfile?.phone,
        designation: userProfile?.designation,
        description: userProfile?.description,
        image: userProfile?.image || "",
        address: userProfile?.address,
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
  const user_id = helper.GetUserId();
  try {
    const res = await axios.get(
      `${APP_END_POINT}profile/get-user-profile/${user_id}`,
      {
        headers: helper.GetTokenHeader(),
      }
    );
    return res.data;
  } catch (error) {
    console.log(error.response);
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

const uploadUserImage = async (image) => {
  const data = new FormData();
  data.append("file", image);
  data.append("upload_preset", APP_NAME);
  data.append("cloud_name", CLOUD_NAME);

  try {
    const res = await fetch(IMAGE_URL, {
      method: "POST",
      body: data,
    });

    const cloudData = await res.json();

    return cloudData;
  } catch (error) {
    console.log(error);
  }
};

export { CreateUserProfile, GetUserProfile, uploadUserImage };
