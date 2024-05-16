import React from "react";
import styles from "./styles.module.css";
export default function Navbar() {
  return (
    <div className={styles.fullContainer}>
      <p className={styles.logo}>SecurX</p>
      

      <ul className={styles["nav__links"]}>
        
      </ul>

      <a className={styles.cta} href="">
        <button>Log Out</button>
      </a>
    </div>
  );
}
