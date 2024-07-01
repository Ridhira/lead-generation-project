import React, { Fragment, useEffect, useState } from "react";
import ErrorText from "../ErrorText/ErrorText";
import styles from "./Input.module.css";
import EyeButton from "../EyeButton/EyeButton";
import DatePicker from "react-multi-date-picker";

// Get today's date in YYYY-MM-DD format
const today = new Date().toISOString().split("T")[0];

const InputText = ({
  type = "text",
  id,
  name,
  value,
  onChange,
  error,
  label,
  readOnly = false,
  onInput = () => {},
  placeholder = "",
  disabled = false,
}) => {
  return (
    <Fragment>
      <div className={styles.inputGroup}>
        <label htmlFor={id}>{label}</label>
        <input
          type={type}
          id={id}
          name={name}
          value={value?.[name]}
          onChange={onChange}
          onInput={onInput}
          readOnly={readOnly}
          max={today}
          placeholder={placeholder}
          disabled={disabled}
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

const InputTextArea = ({
  id,
  name,
  value,
  onChange,
  error,
  label,
  placeholder = "",
}) => {
  return (
    <Fragment>
      <div className={styles.inputGroup}>
        <label htmlFor={id}>{label}</label>
        <textarea
          type="textarea"
          id={id}
          name={name}
          value={value?.[name]}
          onChange={onChange}
          rows={4}
          placeholder={placeholder}
        ></textarea>
        {error?.[name] && <ErrorText errorText={error?.[name]} />}
      </div>
    </Fragment>
  );
};

const InputFile = ({ id, name, value, onChange, error, label }) => {
  return (
    <Fragment>
      <div className={styles.inputGroup}>
        <label htmlFor={id}>{label}</label>
        <input
          type="file"
          id={id}
          name={name}
          value={value?.[name]}
          onChange={onChange}
        />
        {error?.[name] && <ErrorText errorText={error?.[name]} />}
      </div>
    </Fragment>
  );
};

const InputDate = ({ id, name, value, onChange, error, label }) => {
  const [val, setVal] = useState();

  let userDob = new Date(value?.dob?.split("T")[0]);

  const formatNumber = (num) => {
    return num < 10 ? `0${num}` : `${num}`;
  };

  let fnDataFormat = {
    target: {
      name: "dob",
      value: `${val?.year}-${formatNumber(val?.month?.number)}-${formatNumber(
        val?.day
      )}`,
    },
  };

  useEffect(() => {
    if (val) {
      onChange(fnDataFormat);
    }
  }, [val]);

  return (
    <Fragment>
      <div className={styles.inputGroup}>
        <label htmlFor={id}>{label}</label>
        <DatePicker
          value={val || userDob}
          onChange={setVal}
          style={{ height: "3.9rem", width: "32.5rem" }}
          format="DD MMMM YYYY"
          name={name}
          id={id}
          placeholder="Select DOB"
          maxDate={new Date()}
        />
        {error?.[name] && <ErrorText errorText={error?.[name]} />}
      </div>
    </Fragment>
  );
};

export { InputText, InputPassword, InputTextArea, InputFile, InputDate };
