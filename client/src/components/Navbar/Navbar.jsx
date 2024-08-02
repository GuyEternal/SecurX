import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const history = useHistory();

  const checkCookieToken = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_BACKEND_URL + `/auth/checkAuth`,
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      if (response.data.success) {
        setIsLoggedIn(true);
      } else {
        history.push("/");
      }
    } catch (error) {
      throw error;
    }
  };
  useEffect(() => {
    if (!isLoggedIn) {
      checkCookieToken();
    }
  }, []);

  const handleLogOut = async () => {
    try {
      axios.get(process.env.REACT_APP_BACKEND_URL + `/auth/logout`, {
        withCredentials: true,
      });
      history.push("/");
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className={styles.fullContainer}>
      <p className={styles.logo}>SecurX</p>

      <ul className={styles["nav__links"]}></ul>

      <a className={styles.cta} href="">
        <button onClick={handleLogOut}>Log Out</button>
      </a>
    </div>
  );
}
