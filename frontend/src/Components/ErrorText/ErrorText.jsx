import React, { Fragment } from "react";
import styles from "./ErrorText.module.css";

const ErrorText = ({ errorText }) => {
  return (
    <Fragment>
      <div className={styles.error_text}>{errorText}</div>
    </Fragment>
  );
};

export default ErrorText;
