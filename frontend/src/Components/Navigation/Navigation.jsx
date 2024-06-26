import React, { Fragment } from "react";
import styles from "./Navigation.module.css";
import { Link } from "react-router-dom";

const Navigation = ({ text, path }) => {
  return (
    <Fragment>
      <div className={styles.signupContainer}>
        <Link to={path} className={styles.signupLink}>
          {text}
        </Link>
      </div>
    </Fragment>
  );
};

export default Navigation;

//
