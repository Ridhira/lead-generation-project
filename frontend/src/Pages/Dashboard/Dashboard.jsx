import React, { Fragment, useState } from "react";
import styles from "./Dashboard.module.css";
import villa_image from "../../assets/villa_features.jpeg";
import { BiNotepad } from "react-icons/bi";
import { FaRegComments } from "react-icons/fa";
import { FaHandHoldingUsd } from "react-icons/fa";
import { GiProgression } from "react-icons/gi";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const data = [
    { id: 1, text: "applications", value: 12 },
    { id: 2, text: "bookings", value: 12 },
    { id: 3, text: "invoice raised", value: 12 },
    { id: 4, text: "total paid  ", value: 12 },
    { id: 5, text: "Application incentive", value: 12 },
    { id: 6, text: "base earnings", value: 12 },
    { id: 7, text: "ladder incentive", value: 12 },
    { id: 8, text: "total earning", value: 12 },
  ];

  const { userprofile } = useSelector((state) => state.profile);
  console.log("user", userprofile);

  const handleDownload = (e, type) => {
    e.preventDefault();

    if (!type) return;

    let link = document.createElement("a");
    if (type === "brochure") {
      link.href = "/src/assets/VM_Brochure.pdf"; // Replace with your file URL
      link.download = "VM-Brochure.pdf"; // Replace with your desired file name
    } else if (type === "commission") {
      link.href = "/src/assets/Growth_Partnars_Payment_Scheme.jpg"; // Replace with your file URL
      link.download = "payment-schemes.jpg"; // Replace with your desired file name
    } else if (type === "site") {
      link.href = "/src/assets/site_progress.pdf"; // Replace with your file URL
      link.download = "site-progress.pdf"; // Replace with your desired file name
    }
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // @ JSX START
  return (
    <Fragment>
      <div className={styles.tab_container}>
        {data.map((item) => {
          return (
            <div key={item.id} className={styles.tab}>
              <span>{item.text}</span>
              <span>{`${item.id === 8 ? "₹" : ""} ${
                item.id === 8 ? item.value.toFixed(2) : item.value
              }`}</span>
            </div>
          );
        })}
      </div>
      <div className={styles.download_section}>
        <img src={villa_image} />
        <div className={styles.downloads}>
          <span onClick={(e) => handleDownload(e, "brochure")}>
            <BiNotepad />
            Download Brochure
          </span>
          <span onClick={(e) => handleDownload(e, "commission")}>
            <FaHandHoldingUsd />
            Download Commission Sheet
          </span>
          <span onClick={(e) => handleDownload(e, "site")}>
            <GiProgression />
            Download Site Progress
          </span>
        </div>
        <div className={styles.video_container}>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/qzkTw13dpO8?si=y9tfb8n5JEmFXARo"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            frameBorder="0"
          ></iframe>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/rn5AOpbOhjA?si=04_ExmZa6Bk1mJGt"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
