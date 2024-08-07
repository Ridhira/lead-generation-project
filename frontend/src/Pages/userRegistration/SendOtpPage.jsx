import React, { Fragment, useState } from "react";
import styles from "./LoginPage.module.css";
import { isValidEmail, otpFormValidation } from "../../utility";
import Button from "../../Components/Buttons/Button";
import Navigation from "../../Components/Navigation/Navigation";
import { InputText, InputPassword } from "../../Components/Input/Input";
import { SendOTP, ResetPassword } from "../../services/LoginSignup";
import ErrorText from "../../Components/ErrorText/ErrorText";
import { useNavigate } from "react-router-dom";
import login_image from "../../assets/login_screen_image.jpeg";
import { Toaster } from "../../utility/Toast";
const SUCCESS = import.meta.env.VITE_APP_SUCCESS;

const SendOtpPage = () => {
  const [showEmail, setShowEmail] = useState(true);
  const [errors, setErrors] = useState();
  const [serverError, setServerError] = useState();
  const [enteredEmail, setEnteredEmail] = useState("");
  const [formData, setFormData] = useState({
    otp: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const sendOtpButtonClickHandler = async (e) => {
    e.preventDefault();
    if (enteredEmail === "") {
      setErrors("Email is required");
      return;
    } else if (!isValidEmail(enteredEmail)) {
      setErrors("Invalid email format");
      return;
    } else {
      const result = await SendOTP(enteredEmail);
      if (result.status == SUCCESS) {
        setShowEmail(false);
        setServerError();
      } else {
        setServerError(result.statusText);
      }
    }
  };

  const validateOTPHandler = async (e) => {
    e.preventDefault();
    const isValid = otpFormValidation(formData, setErrors);
    if (isValid) {
      const result = await ResetPassword(formData, enteredEmail);

      if (result.status == SUCCESS) {
        Toaster().success("Password Update Successfully. Please Login");
        navigate("/");
      } else {
        Toaster().error(result.statusText);
      }
    }
  };

  // ! HANDLE CHANGE FUNCTION
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // $ JSX START
  return (
    <Fragment>
      <div className={styles.loginContainer}>
        <img src={login_image} alt="login_image" />
        <div className={styles.loginContainer2}>
          <div className={styles.loginBox}>
            <h2>Reset Password</h2>
            {showEmail && (
              <form>
                <InputText
                  type="email"
                  id="email"
                  name="email"
                  value={{ email: enteredEmail }}
                  onChange={(e) => setEnteredEmail(e.target.value)}
                  error={{
                    email: errors,
                  }}
                />
                {serverError && <ErrorText errorText={serverError} />}
                <Button
                  btnText="Send OTP"
                  onClick={(e) => sendOtpButtonClickHandler(e)}
                />
              </form>
            )}

            {!showEmail && (
              <form>
                <p className={styles.successText}>
                  OTP is sent to {enteredEmail} successfully
                </p>
                <InputText
                  type="number"
                  id="otp"
                  name="otp"
                  value={formData}
                  onChange={handleChange}
                  error={errors}
                  label="OTP"
                />

                <InputPassword
                  id="password"
                  name="password"
                  value={formData}
                  onChange={handleChange}
                  error={errors}
                  label="Password"
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
                <Button
                  btnText="Submit"
                  onClick={(e) => validateOTPHandler(e)}
                />
              </form>
            )}

            <Navigation text="Go Back" path="/" />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SendOtpPage;
