import React, { Fragment, useState } from "react";
import { InputText, InputPassword } from "../../Components/Input/Input";
import Button from "../../Components/Buttons/Button";
import styles from "./UpdatePassword.module.css";
import { updatePasswordValidation } from "../../utility";
import { UpdateUserPassword } from "../../services/LoginSignup";
import { Toaster } from "../../utility/Toast";
import ErrorText from "../../Components/ErrorText/ErrorText";
import helper from "../../utility/helper";
import { useNavigate } from "react-router-dom";

const SUCCESS = import.meta.env.VITE_APP_SUCCESS;

const UpdatePassword = () => {
  const [errors, setErrors] = useState();
  const [serverError, setServerError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  // ! HANDLE CHANGE FUNCTION
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const updatePasswordClickHandler = async (e) => {
    e.preventDefault();
    setServerError();
    const isValid = updatePasswordValidation(formData, setErrors);
    if (isValid) {
      const result = await UpdateUserPassword(formData);
      if (result.status == SUCCESS) {
        Toaster().success("Password Updated Successfully. Please Login Again");
        helper.RemoveItem("user");
        navigate("/");
      } else {
        // Toaster().error(result.statusText);
        setServerError(result.statusText);
      }
    }
  };

  return (
    <Fragment>
      <div className={styles.update_form_container}>
        <h3>Update Password</h3>
        <div className={styles.update_form}>
          <InputText
            type="email"
            id="email"
            name="email"
            value={formData}
            onChange={handleChange}
            error={errors}
            label="Email"
            disabled={false}
          />
          <InputPassword
            id="oldPassword"
            name="oldPassword"
            value={formData}
            onChange={handleChange}
            error={errors}
            label="Old Password"
          />
          <InputPassword
            id="newPassword"
            name="newPassword"
            value={formData}
            onChange={handleChange}
            error={errors}
            label="New Password"
          />
          <InputPassword
            id="confirmPassword"
            name="confirmPassword"
            value={formData}
            onChange={handleChange}
            error={errors}
            label="Confirm Password"
          />
          {serverError && <ErrorText errorText={serverError} />}
          <div className={styles.update_button}>
            <Button
              btnText="Update"
              onClick={(e) => updatePasswordClickHandler(e)}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdatePassword;
