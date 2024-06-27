import React, { Fragment } from "react";
import notFoundImage from "../../assets/ridhira_logo.png"; // Adjust the path to your image
import styles from "./NotFound.module.css";

const NotFound = () => {
  return (
    <Fragment>
      <div className={styles.container}>
        <img src={notFoundImage} alt="Not Found" className={styles.image} />
        <h1 className={styles.title}>404 - Page Not Found</h1>
        <p className={styles.message}>
          The page you are looking for does not exist.
        </p>
      </div>
    </Fragment>
  );
};

export default NotFound;
