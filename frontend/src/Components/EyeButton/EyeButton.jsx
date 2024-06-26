import React, { Fragment } from "react";
import styles from "./EyeButton.module.css";

const EyeButton = ({ showPassword, onClick }) => {
  return (
    <Fragment>
      <button className={styles.showPasswordButton} onClick={onClick}>
        <span role="img" aria-label="show password">
          {showPassword ? (
            <i className="fa-regular fa-eye-slash"></i>
          ) : (
            <i className="fa-regular fa-eye"></i>
          )}
        </span>
      </button>
    </Fragment>
  );
};

export default EyeButton;
