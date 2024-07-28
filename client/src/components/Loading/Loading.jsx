import React, { useEffect } from "react";
import logo from "../Home/img/logo.png";
import LoadingCss from "./loading.module.css"

const LoadingPage = () => {
  
    useEffect(() => {
      setTimeout(() => {
      }, 2000);
    }, []);
  
    return (
      <div className={LoadingCss.load}>
        <img className={LoadingCss.img}
          src={logo}
          alt="loading logo"
        />
      </div>
    );
  };
  
  export default LoadingPage;
  
  
  
  
  