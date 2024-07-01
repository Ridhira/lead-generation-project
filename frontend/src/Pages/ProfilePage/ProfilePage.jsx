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
import ErrorText from "../../Components/ErrorText/ErrorText";
import {
  CreateUserProfile,
  GetUserProfile,
  uploadUserImage,
} from "../../services/UserProfile";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE } from "../../reducers/profileSlice";
import { Toaster } from "../../utility/Toast";
import _ from "lodash";
import { ApiLoader } from "../../Components/PageLoader/PageLoader";

const ProfilePage = () => {
  const dispatch = useDispatch();

  const [userImage, setUserImage] = useState(null);
  const [errors, setErrors] = useState();
  const [serverError, setServerError] = useState();
  const { userprofile } = useSelector((state) => state.profile);
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [formData, setFormData] = useState({
    dob: "",
    phone: "",
    designation: "",
    description: "",
    address: "",
    image: "",
  });

  const defaultData = {
    name: helper.GetUserFullName(),
    email: helper.GetUserEmail(),
  };

  // ! HANDLE CHANGE FUNCTION
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // @ FORM SUBMITTED HANDLER
  const submitBtnHandler = async (e) => {
    e.preventDefault();
    setShowLoader(true);
    let resultForm;
    let resultImage;
    if (isSubmitEnabled) {
      resultForm = await CreateUserProfile(formData);
    }

    if (userImage !== null) {
      const result = await uploadUserImage(userImage);
      if (result.url) {
        resultImage = await CreateUserProfile({ image: result.url });
      }
    }

    if (resultForm.success || resultImage.success) {
      Toaster().success("Profile Updated Successfully");
      setShowLoader(false);
    }

    if (!isSubmitEnabled && userImage === null) {
      setServerError("At least one input field is required ");
      setShowLoader(false);
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
        image: userprofile[0].image,
      }));
    }
  }, [userprofile]);

  useEffect(() => {
    // Check if any value is not empty using lodash
    const checkValues = () => _.some(formData, _.negate(_.isEmpty));
    setIsSubmitEnabled(checkValues());
  }, [formData]);

  // @ JSX START
  return (
    <Fragment>
      <div className={styles.profile_head}>
        <h4>Profile</h4>
      </div>
      <div className={styles.profile_container}>
        <div className={styles.image_container}>
          {userImage ? (
            <img
              src={userImage ? URL.createObjectURL(userImage) : ""}
              alt="User Image"
            />
          ) : (
            <img
              src={
                formData?.image ||
                "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
              }
              alt="User Image"
            />
          )}
        </div>

        <div className={styles.input_container}>
          <InputText
            type="text"
            id="name"
            name="name"
            value={defaultData}
            onChange={() => {}}
            readOnly={true}
            label="Full Name"
            disabled={true}
          />

          <InputText
            type="email"
            id="email"
            name="email"
            value={defaultData}
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
            onChange={(e) => setUserImage(e.target.files[0])}
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
            {showLoader && <ApiLoader />}
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
