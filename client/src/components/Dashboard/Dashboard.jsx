import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./Main.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faEye,
  faEyeSlash,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import Navbar from "../Navbar/Navbar";

const Dashboard = () => {
  const [websiteName, setWebsiteName] = useState("");
  const [websiteUsername, setWebsiteUsername] = useState("");
  const [websitePassword, setWebsitePassword] = useState("");
  const [passwords, setPasswords] = useState([]);
  const [editingPassword, setEditingPassword] = useState(null);
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
        setPasswords((prevPasswords) =>
          prevPasswords.filter((password) => password._id !== id)
        );
        handleView();
      })
      .catch((err) => console.error(err));
  };

  const handleEdit = (password) => {
    setEditingPassword(password);
    setWebsiteName(password.websiteName);
    setWebsiteUsername(password.websiteUsername);
    setWebsitePassword(password.websitePassword);
  };

  const handleUpdate = () => {
    const updatedWebsite = {
      websiteName,
      websiteUsername,
      websitePassword,
    };

    axios
      .put(`${baseURL}/edit/${editingPassword.websiteId}`, updatedWebsite)
      .then((res) => {
        setEditingPassword(null);
        setWebsiteName("");
        setWebsiteUsername("");
        setWebsitePassword("");
        handleView();
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className={styles.fullpage_wrapper}>
      <Navbar />
      <div className={styles.main_container}>
        <div className={styles.add_container}>
          <h2>{editingPassword ? "Edit website:" : "Add a new website:"}</h2>
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
            {editingPassword ? (
              <button className={styles.add_btn} onClick={handleUpdate}>
                Update
              </button>
            ) : (
              <button className={styles.add_btn} onClick={handleAdd}>
                Add
              </button>
            )}
          </div>
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
                    <div className={styles.password_field}>
                      <input
                        type={password.showPassword ? "text" : "password"}
                        value={password.websitePassword}
                        readOnly
                        className={styles.password_input}
                      />
                      <button
                        className={styles.show_password_btn}
                        onClick={() => {
                          togglePasswordVisibility(index, password.websiteId);
                        }}
                      >
                        <FontAwesomeIcon
                          icon={password.showPassword ? faEyeSlash : faEye}
                        />
                      </button>
                      <button
                        className={styles.edit_password_btn}
                        onClick={() => handleEdit(password)}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button
                        className={styles.delete_password_btn}
                        onClick={() => handleDelete(password.websiteId)}
                      >
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </button>
                    </div>
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
