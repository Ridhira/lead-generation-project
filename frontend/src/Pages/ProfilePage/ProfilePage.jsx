import React, { Fragment, useEffect, useState } from "react";
import styles from "./ProfilePage.module.css";
import {
  InputText,
  InputTextArea,
  InputFile,
  InputDate,
} from "../../Components/Input/Input";
import Button from "../../Components/Buttons/Button";
import helper from "../../utility/helper";
import { profileFormValidation } from "../../utility";
import ErrorText from "../../Components/ErrorText/ErrorText";
import { CreateUserProfile, GetUserProfile } from "../../services/UserProfile";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE } from "../../reducers/profileSlice";
import { Toaster } from "../../utility/Toast";

const userImage =
  "https://www.josejeuland.com/wp-content/uploads/2022/04/headshotindoor.jpg";

const ProfilePage = () => {
  const dispatch = useDispatch();

  const [errors, setErrors] = useState();
  const [serverError, setServerError] = useState();
  const { userprofile } = useSelector((state) => state.profile);
  const [formData, setFormData] = useState({
    name: helper.GetUserFullName(),
    email: helper.GetUserEmail(),
    dob: "",
    phone: "",
    designation: "",
    description: "",
    address: "",
  });

  // ! HANDLE CHANGE FUNCTION
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // @ SUBMIT BUTTON HANDLER
  const submitBtnHandler = async (e) => {
    e.preventDefault();
    const isValid = profileFormValidation(formData, setErrors);
    if (isValid) {
      const result = await CreateUserProfile(formData);
      console.log("result====>", result);
      if (result.success) {
        console.log("Indise if clock");
        Toaster().success("Profile Updated Successfully");
      } else {
        setServerError(result.message);
      }
    }
  };

  // # GET USER PROFILE

  const GetUserprofileData = async () => {
    const result = await GetUserProfile();
    if (result.success) {
      dispatch(UPDATE(result.data[0]));
    }
  };

  useEffect(() => {
    if (userprofile.length === 0) {
      GetUserprofileData();
    }
  }, []);

  useEffect(() => {
    if (userprofile && userprofile.length > 0) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        phone: userprofile[0].phone,
        dob: userprofile[0].dob,
        address: userprofile[0].address,
        description: userprofile[0].description,
        designation: userprofile[0].designation,
      }));
    }
  }, [userprofile]);

  return (
    <Fragment>
      <div className="primary__heading">
        <h4>Profile</h4>
      </div>
      <div className={styles.profile_container}>
        <div className={styles.image_container}>
          <img src={userImage} alt="User Image" />
        </div>
        <div className={styles.input_container}>
          <InputText
            type="text"
            id="name"
            name="name"
            value={formData}
            onChange={() => {}}
            readOnly={true}
            label="Full Name"
            disabled={true}
          />

          <InputText
            type="email"
            id="email"
            name="email"
            value={formData}
            onChange={() => {}}
            label="Email"
            disabled={true}
          />

          <InputDate
            id="dob"
            name="dob"
            value={formData}
            onChange={handleChange}
            label="Date of Birth"
          />

          <InputText
            type="number"
            id="phone"
            name="phone"
            value={formData}
            onChange={handleChange}
            label="Phone"
            onInput={(e) => {
              if (e.target.value.length > 10) {
                e.target.value = e.target.value.slice(0, 10);
              }
            }}
            placeholder="Enter Phone Number"
          />

          <InputText
            type="text"
            id="designation"
            name="designation"
            value={formData}
            onChange={handleChange}
            label="Designation"
            placeholder="Enter Designation"
          />

          <InputFile
            id="image"
            name="image"
            value={formData}
            onChange={() => {}}
            label="Upload Image"
          />

          <InputTextArea
            id="address"
            name="address"
            value={formData}
            onChange={handleChange}
            label="Address"
            placeholder="Address"
          />

          <InputTextArea
            id="description"
            name="description"
            value={formData}
            onChange={handleChange}
            label="About Me"
            placeholder="Tell us about yourself"
          />

          <div className={styles.error_container}>
            {errors && (
              <ErrorText errorText={errors.error} text_align_center={true} />
            )}
            {serverError && (
              <ErrorText errorText={serverError} text_align_center={true} />
            )}
          </div>

          <div className={styles.submitBtn}>
            <Button btnText="Submit" onClick={(e) => submitBtnHandler(e)} />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ProfilePage;
