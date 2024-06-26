import React, { Fragment } from "react";
import styles from "./Button.module.css";

const Button = ({ btnText, onClick }) => {
  return (
    <Fragment>
      <button className={styles.submitButton} onClick={onClick}>
        {btnText}
      </button>
    </Fragment>
  );
};

export default Button;
