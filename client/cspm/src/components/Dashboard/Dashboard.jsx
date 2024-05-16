import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./Main.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../Navbar/Navbar";

const Dashboard = () => {
  const [websiteName, setWebsiteName] = useState("");
  const [websiteUsername, setWebsiteUsername] = useState("");
  const [websitePassword, setWebsitePassword] = useState("");
  const [passwords, setPasswords] = useState([]);
  const { id: userId } = useParams();
  const baseURL = "http://localhost:3001/api/passwords";
  const [isLoading, setIsLoading] = useState(false);

  const handleAdd = () => {
    const newWebsite = {
      websiteName,
      websiteUsername,
      websitePassword,
    };

    axios
      .post(`${baseURL}/input/${userId}`, newWebsite)
      .then((res) => {
        console.log(res.data);
        setWebsiteName("");
        setWebsiteUsername("");
        setWebsitePassword("");
        setPasswords((prevPasswords) => [...prevPasswords, res.data.website]);
        handleView();
      })
      .catch((err) => console.error(err));
  };

  const handleView = () => {
    setIsLoading(true);
    axios
      .get(`${baseURL}/login-credentials/${userId}`)
      .then((res) => {
        console.log(res.data);
        setPasswords(res.data.passwords);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    handleView();
  }, []);

  const togglePasswordVisibility = (index, id) => {
    const websiteId = id;
    axios
      .post(`${baseURL}/show-password`, { websiteId })
      .then((res) => {
        console.log(res.data);
        const decryptedPassword = res.data.websitepassword;
        setPasswords((prevPasswords) => {
          const newPasswords = [...prevPasswords];
          newPasswords[index].showPassword = !newPasswords[index].showPassword;
          newPasswords[index].websitePassword = decryptedPassword;
          return newPasswords;
        });
      })
      .catch((err) => console.error(err));
  };

  const handleDelete = (id) => {
    axios
      .delete(`${baseURL}/delete/${id}`)
      .then((res) => {
        console.log(res.data);
        setPasswords((prevPasswords) =>
          prevPasswords.filter((password) => password._id !== id)
        );
        handleView();
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className={styles.fullpage_wrapper}>
      <Navbar />
      <div className={styles.main_container}>
        <div className={styles.add_container}>
          <h2>Add a new website:</h2>
          <div className={styles.input_container}>
            <input
              type="text"
              placeholder="Website Name"
              value={websiteName}
              onChange={(e) => setWebsiteName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Username"
              value={websiteUsername}
              onChange={(e) => setWebsiteUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={websitePassword}
              onChange={(e) => setWebsitePassword(e.target.value)}
            />
          </div>
          <button className={styles.add_btn} onClick={handleAdd}>
            Add
          </button>
        </div>

        {isLoading ? (
          <div className={styles.loading_container}>
            <div className={styles.loading_animation}></div>
            <p>Loading Passwords...</p>
          </div>
        ) : (
          <div className={styles.passwords_container}>
            <h2>Your Websites:</h2>
            <div className={styles.pwd_box}>
              {passwords.map((password, index) => (
                <div className={styles.password_card} key={index}>
                  <div className={styles.website_info}>
                    <p className={styles.website_name}>
                      <strong>Website:</strong> {password.websiteName}
                    </p>
                    <p className={styles.website_username}>
                      <strong>Username:</strong> {password.websiteUsername}
                    </p>
                  </div>
                  <div className={styles.password_info}>
                    <p className={styles.password_title}>
                      <strong>Password:</strong>
                    </p>
                    <button
                      className={styles.show_password_btn}
                      onClick={() => {
                        togglePasswordVisibility(index, password.websiteId);
                      }}
                    >
                      {password.showPassword
                        ? password.websitePassword
                        : "Show Password"}
                    </button>
                    <button
                      className={styles.delete_password_btn}
                      onClick={() => handleDelete(password.websiteId)}
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
