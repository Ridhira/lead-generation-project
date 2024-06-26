import React, { Fragment, useState } from "react";
import styles from "./Dashboard.module.css";
import { Link } from "react-router-dom";
import Ridhira_logo from "../../assets/ridhira_logo.png";

const Dashboard = () => {
  const [showServicesDropdown, setShowServicesDropdown] = useState(false);
  const [showAvatarDropdown, setShowAvatarDropdown] = useState(false);

  const toggleServicesDropdown = () => {
    setShowServicesDropdown(!showServicesDropdown);
  };

  const toggleAvatarDropdown = () => {
    setShowAvatarDropdown(!showAvatarDropdown);
  };

  return (
    <Fragment>
      {/* <header className={styles.header}>
        <div className={styles.logo}>
          <Link to="/">
            <img src={Ridhira_logo} />
          </Link>
        </div>
        <nav className={styles.nav_links}>
          <Link to="#">Home</Link>
          <Link to="#">About</Link>
          <Link to="#">Contact</Link>
          <button className={styles.logout_btn}>Logout</button>
        </nav>
      </header> */}
      <header className={styles.header}>
        <div className={styles.left}>
          <img src={Ridhira_logo} alt="Icon" className={styles.icon} />
        </div>
        <div className={styles.right}>
          <a href="#home" className={styles.link}>
            Home
          </a>
          <div className={`${styles.dropdown} ${styles.link}`}>
            Services
            <div className={styles.dropdownContent}>
              <a href="#service1">Service 1</a>
              <a href="#service2">Service 2</a>
              <a href="#service3">Service 3</a>
            </div>
          </div>
          <a href="#contact" className={styles.link}>
            Contact Us
          </a>
          <div className={styles.avatarContainer}>
            <div className={styles.avatar}>JD</div>
            <div className={styles.dropdownContent}>
              <a href="#profile">Profile</a>
              <a href="#logout">Logout</a>
            </div>
          </div>
        </div>
      </header>
    </Fragment>
  );
};

export default Dashboard;
