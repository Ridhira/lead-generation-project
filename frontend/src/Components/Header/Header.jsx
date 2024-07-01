import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import Ridhira_logo from "../../assets/ridhira_logo.png";
import helper from "../../utility/helper";
import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  // const [showMobService, setShowMobService] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  // const toggleMobServices = () => {};

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  // $ LOGOUT HANDLER
  const logoutClickHandler = (e) => {
    e.preventDefault();
    helper.RemoveItem("user");
    navigate("/");
  };

  const backgroundColor = helper.GetRandomColor();
  const textColor = helper.IsLightColor(backgroundColor) ? "#000" : "#FFF";

  const mobileNavigation = [
    {
      path: "/dashboard",
      text: "Home",
      icon: <i className="fa-solid fa-house"></i>,
    },
    {
      path: "#",
      text: "Services",
      icon: <i className="fa-solid fa-handshake-angle"></i>,
    },
    {
      path: "#",
      text: "Contact Us ",
      icon: <i className="fa-solid fa-envelope"></i>,
    },
    {
      path: "/user-profile",
      text: "Profile",
      icon: <i className="fa-solid fa-user"></i>,
    },
    {
      path: "/update-password",
      text: "Update Password",
      icon: <i className="fa-solid fa-lock"></i>,
    },
  ];

  // @ JSX START
  return (
    <Fragment>
      <header className={styles.header}>
        <div className={styles.navbar}>
          {/* @ NAV BAR FOR DEVICE WIDTH MORE THAN 768PX (DESKTOP, LAPTOP AND TAB )*/}
          <div className={styles.navBranding}>
            <Link to="/dashboard">
              <img src={Ridhira_logo} alt="Icon" className={styles.icon} />
            </Link>
          </div>
          <div className={styles.navMenu}>
            <Link to="/dashboard" className={styles.navLink}>
              Home
            </Link>
            <div className={styles.dropdown}>
              <Link to="#" className={styles.navLink}>
                Services
              </Link>
              {/* <div className={styles.dropdownContent}>
                <Link to="#" className={styles.dropdownItem}>
                  Service 1
                </Link>
                <Link to="#" className={styles.dropdownItem}>
                  Service 2
                </Link>
                <Link to="#" className={styles.dropdownItem}>
                  Service 3
                </Link>
              </div> */}
            </div>
            <Link to="#" className={styles.navLink}>
              Contact Us
            </Link>
            <div className={styles.avatarContainer}>
              <div
                className={styles.avatar}
                style={{ backgroundColor, color: textColor }}
              >
                {helper.GetUserNameInitials()}
              </div>
              <div className={styles.dropdownContentAvatar}>
                <Link to="/user-profile" className={styles.dropdownItem}>
                  Profile
                </Link>
                <Link to="/update-password" className={styles.dropdownItem}>
                  Update Password
                </Link>
                <button
                  onClick={(e) => logoutClickHandler(e)}
                  className={styles.logout_button}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
          <div
            className={`${styles.hamburger} ${drawerOpen ? styles.active : ""}`}
            onClick={toggleDrawer}
          >
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
          </div>
          {/* NAV BAR FOR DEVICE WIDTH LESS THAN 768PX (MOBILE )*/}
          <div
            className={`${styles.drawer} ${styles.hide_drawer} ${
              drawerOpen ? styles.open : ""
            }`}
          >
            <div className={styles.drawerContent}>
              <div className={styles.avatar_container}>
                <div
                  className={styles.avatar}
                  style={{ backgroundColor, color: textColor }}
                >
                  {helper.GetUserNameInitials()}
                </div>
              </div>
              {mobileNavigation.map((item) => {
                return (
                  <Link
                    to={item.path}
                    className={styles.drawerItem}
                    key={Math.random()}
                  >
                    {item.icon}&nbsp;&nbsp;&nbsp;{item.text}
                  </Link>
                );
              })}
              <button
                onClick={(e) => logoutClickHandler(e)}
                className={styles.logout_button}
              >
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
                &nbsp;&nbsp;&nbsp;Logout
              </button>{" "}
            </div>
          </div>
        </div>
      </header>
    </Fragment>
  );
};

export default Header;
