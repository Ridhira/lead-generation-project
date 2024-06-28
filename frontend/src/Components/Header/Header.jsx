import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Ridhira_logo from "../../assets/ridhira_logo.png";
import helper from "../../utility/helper";
import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
  const navigate = useNavigate();

  // $ LOGOUT HANDLER
  const logoutClickHandler = (e) => {
    e.preventDefault();
    helper.RemoveItem("user");
    navigate("/");
  };

  const backgroundColor = helper.GetRandomColor();
  const textColor = helper.IsLightColor(backgroundColor) ? "#000" : "#FFF";

  return (
    <Fragment>
      <header className={styles.header}>
        <div className={styles.left}>
          <Link to="/dashboard">
            <img src={Ridhira_logo} alt="Icon" className={styles.icon} />
          </Link>
        </div>
        <div className={styles.right}>
          <Link to="/dashboard" className={styles.link}>
            Home
          </Link>
          <div className={`${styles.dropdown} ${styles.link}`}>
            Services
            <div className={styles.dropdownContent}>
              <Link to="#">Service 1</Link>
              <Link to="#">Service 2</Link>
              <Link to="#">Service 3</Link>
            </div>
          </div>
          <Link to="#" className={styles.link}>
            Contact Us
          </Link>
          <div className={styles.avatarContainer}>
            <div
              className={styles.avatar}
              style={{ backgroundColor, color: textColor }}
            >
              {helper.GetUserNameInitials()}
            </div>
            <div
              className={`${styles.dropdownContent} ${styles.dropdownContentAvatar}`}
            >
              <Link to="/user-profile">Profile</Link>
              <Link to="/update-password">Update Password</Link>
              <button onClick={logoutClickHandler}>Logout</button>
            </div>
          </div>
        </div>
      </header>
    </Fragment>
  );
};

export default Header;
