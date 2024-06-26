import React, { Fragment, useState } from "react";
import styles from "./LoginPage.module.css";
import { loginFormValidation } from "../../utility";
import Button from "../../Components/Buttons/Button";
import Navigation from "../../Components/Navigation/Navigation";
import { InputText, InputPassword } from "../../Components/Input/Input";
import { UserLogin } from "../../services/LoginSignup";
import ErrorText from "../../Components/ErrorText/ErrorText";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [errors, setErrors] = useState();
  const [serverError, setServerError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  // @ SUBMIT BUTTON HANDLER
  const submitBtnClickHandler = async (e) => {
    e.preventDefault();
    const isValid = loginFormValidation(formData, setErrors);
    if (isValid) {
      const result = await UserLogin(formData);
      console.log("result-->", result);
      if (result.success) {
        navigate("/dashboard");
      } else {
        setServerError(result.message);
      }
    } else {
      console.log("Form Validation Failed");
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
        <div className={styles.loginBox}>
          <h2>Login</h2>
          <form>
            <InputText
              type="email"
              id="email"
              name="email"
              value={formData}
              onChange={handleChange}
              error={errors}
              label="Email"
            />
            <InputPassword
              id="password"
              name="password"
              value={formData}
              onChange={handleChange}
              error={errors}
              label="Password"
            />
            {serverError && <ErrorText errorText={serverError} />}
            <Navigation text="Forgot Password?" path="/reset-password" />
            <Button btnText="Login" onClick={submitBtnClickHandler} />
          </form>
          <Navigation text="Don't have an account? Sign Up" path="/signup" />
        </div>
      </div>
    </Fragment>
  );
};

export default LoginPage;
