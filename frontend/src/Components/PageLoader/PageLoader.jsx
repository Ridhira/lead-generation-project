import React, { Fragment } from "react";
import styles from "./PageLoader.module.css";

const PageLoader = () => {
  return (
    <Fragment>
      <div className={styles.loaderContainer}>
        <div className={styles.loader}>&nbsp;</div>
      </div>
    </Fragment>
  );
};

const ApiLoader = () => {
  return (
    <Fragment>
      <div className={styles.loaderContainer_api}>
        <div className={styles.loader_api}>&nbsp;</div>
      </div>
    </Fragment>
  );
};

export { PageLoader, ApiLoader };
