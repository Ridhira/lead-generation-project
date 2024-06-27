import React, { Fragment, useState } from "react";
import styles from "./LoginPage.module.css";
import { signUpFormValidation } from "../../utility";
import Button from "../../Components/Buttons/Button";
import Navigation from "../../Components/Navigation/Navigation";
import { InputPassword, InputText } from "../../Components/Input/Input";
import ErrorText from "../../Components/ErrorText/ErrorText";
import { UserSignup } from "../../services/LoginSignup";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [errors, setErrors] = useState();
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    partner_id: "",
  });

  // @ SIGN UP BUTTON HANDLER
  const signUpBtnClickHandler = async (e) => {
    e.preventDefault();
    const isValid = signUpFormValidation(formData, setErrors);
    if (isValid) {
      const result = await UserSignup(formData);
      if (result.success) {
        navigate("/");
      } else {
        setServerError(result.message);
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

  // !JSX START
  return (
    <Fragment>
      <div className={styles.loginContainer}>
        <div className={styles.loginBox}>
          <h2>Sign Up</h2>
          <form>
            <InputText
              type="text"
              id="fullName"
              name="userName"
              value={formData}
              onChange={handleChange}
              label="Full Name"
              error={errors}
            />

            <InputText
              type="email"
              id="email"
              name="email"
              value={formData}
              onChange={handleChange}
              label="Email"
              error={errors}
            />

            <InputText
              type="number"
              id="partner_id"
              name="partner_id"
              value={formData}
              onChange={handleChange}
              label="Partner Id"
              error={errors}
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
              btnText="Sign Up"
              onClick={(e) => signUpBtnClickHandler(e)}
            />
          </form>
          <Navigation text="Already have an account? Login" path="/" />
        </div>
      </div>
    </Fragment>
  );
};

export default SignupPage;
