// Home/Home.jsx
import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import styles from "./home.module.css"; // assuming you have a CSS module
import logo from "./img/logo.png"; // assuming you have a logo image
import desc1 from "./img/bg1.jpg"; // assuming you have an image
import LoadingPage from "../Loading/Loading.jsx"; // assuming you have a LoadingPage component

const Home = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [showLoading, setShowLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const section = document.getElementById(activeSection);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeSection]);

  const handleClick = (event, sectionId) => {
    event.preventDefault();
    setActiveSection(sectionId);
  };

  const handleClick1 = useCallback(() => {
    setShowLoading(true);
    // setTimeout(() => {
      // setShowLoading(false);
      history.push("/login");
    // }, 2000);
  }, [history]);

  const handleClick2 = useCallback(() => {
    setShowLoading(true);
    // setTimeout(() => {
      // setShowLoading(false);
      history.push("/register");
    // }, 2000);
  }, [history]);

  return (
    <div>
      {showLoading ? (
        <LoadingPage />
      ) : (
        <div id="home" className={styles.home1}>
          <section className={styles.home}>
            <header className={styles.header}>
              <div>
                <img src={logo} alt="logo" />
                <h1>SecurX</h1>
              </div>
              <nav>
                <ul>
                  <li>
                    <a
                      href="#home"
                      onClick={(event) => handleClick(event, "home")}
                    >
                      Home
                    </a>
                  </li>
                  <li>
                    <a
                      href="#feature1"
                      onClick={(event) => handleClick(event, "feature1")}
                    >
                      Features
                    </a>
                  </li>
                </ul>
              </nav>
              <div>
                <button onClick={handleClick1}>Login</button>
                <button onClick={handleClick2}>Register</button>
              </div>
            </header>
            <div className={styles.info}>
              <h1>
                The Organized, Secure, <br />
                Efficient <br />
                Password Manager
              </h1>
              <p>
                Store your passwords in a secure, private storage facility{" "}
                <br />
                that you can access with just one click from any of your
                devices.
              </p>
            </div>
          </section>
          <section id="feature1" className={styles.feature1}>
            <img src={desc1} alt="login" />
            <div>
              <h1>Effortlessly Secure Your Data with Just One Tap</h1>
              <hr />
              <p>
                Say Goodbye to Scattered Sticky Notes and hello to SecurX your
                Safe Haven for All Things Sensitive. <br />
                Store Passwords, Credit Cards and Personal Data Safely in One
                Place.
              </p>
            </div>
          </section>
          <hr />
          <section id="feature2" className={styles.feature1}>
            <div>
              <h1>Secure Random Password Generator</h1>
              <hr />
              <p>
                A password generator tool that creates random and unique
                passwords <br />
                of customizable length, incorporating letters, numbers, and
                symbols. <br />
                Provides a quick and easy solution for users to create strong
                passwords <br />
                and enhance the security of their accounts.
              </p>
            </div>
            <img src={desc1} alt="login" />
          </section>
          <footer>
            <hr />
            <p>@copy 2023 SecurX. All rights reserved</p>
          </footer>
        </div>
      )}
    </div>
  );
};

export default Home;
