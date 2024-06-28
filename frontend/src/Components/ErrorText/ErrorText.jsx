import React, { Fragment } from "react";
import styles from "./ErrorText.module.css";

const ErrorText = ({ errorText, text_align_center = false }) => {
  return (
    <Fragment>
      <div
        className={
          text_align_center ? styles.error_text_center : styles.error_text
        }
      >
        {errorText}
      </div>
    </Fragment>
  );
};

export default ErrorText;
