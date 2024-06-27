import React, { Fragment } from "react";
import styles from "./PageLoader.module.css";

const PageLoader = () => {
  return (
    <Fragment>
      <div className={styles.loaderContainer}>
        <div className={styles.loader}>Loading...</div>
      </div>
    </Fragment>
  );
};

export default PageLoader;
