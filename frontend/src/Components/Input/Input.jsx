import React, { Fragment, useState } from "react";
import ErrorText from "../ErrorText/ErrorText";
import styles from "./Input.module.css";
import EyeButton from "../EyeButton/EyeButton";

const InputText = ({
  type,
  id,
  name,
  value,
  onChange,
  error,
  label,
  onInput = () => {},
}) => {
  return (
    <Fragment>
      <div className={styles.inputGroup}>
        <label htmlFor={id}>{label}</label>
        <input
          type={type}
          id={id}
          name={name}
          value={value?.[type]}
          onChange={onChange}
          onInput={onInput}
        />
        {error?.[name] && <ErrorText errorText={error?.[name]} />}
      </div>
    </Fragment>
  );
};

const InputPassword = ({ id, name, value, onChange, error, label }) => {
  const [showPassword, setShowPassword] = useState(true);

  // @ SHOW PASSWORD HANDLER
  const showPasswordHandler = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <Fragment>
      <div className={styles.inputGroup}>
        <label htmlFor={id}>{label}</label>
        <input
          type={showPassword ? "password" : "text"}
          id={id}
          name={name}
          value={value?.[name]}
          onChange={onChange}
        />
        {error?.[name] && <ErrorText errorText={error?.[name]} />}
        <EyeButton
          onClick={(e) => showPasswordHandler(e)}
          showPassword={showPassword}
        />
      </div>
    </Fragment>
  );
};

export { InputText, InputPassword };
