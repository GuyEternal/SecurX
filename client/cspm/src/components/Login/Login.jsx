import React,{useState,useCallback} from "react";
import { Link, useHistory } from "react-router-dom";
import LoginCss from "./login.module.css"
import LoadingPage from "../Loading/Loading";


function Login(){
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const history=useHistory();
  const { username, password } = formData;
  const baseURL = 'https://securex.onrender.com/api/auth';
  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

   
  
  const handleLogin = async (event) => {
    event.preventDefault();

    

    try {
      const res = await fetch(`${baseURL}/login`, {
        method:'POST',
        headers: {
          'Content-Type': 'application/json'                                                   
        },
        body: JSON.stringify({ username, password })
      });
      
      const json = await res.json();
      console.log(json);
      console.log(res);
      if (res.ok) {
        setIsLoggedIn(true);
        setShowLoading(true);
      setTimeout(() => {
        setShowLoading(false);
        history.push(`/Main/${json._id}`);
      }, 2000);
      } 
      
     
    } catch (err) {
      console.error(err.message);
      setLoginFailed(true);
    }
    
  }; 
 
    return(
      <div>
      {showLoading ? (
        <LoadingPage />
      ) : (
      <div className={LoginCss.login}> 
        <section>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>

      <div className={LoginCss.signin}>
        <div className={LoginCss.content}>
          <h2>Sign In</h2>
          <div className={LoginCss.form}>
            <div className={LoginCss.inputbox}>
              <input type="text" 
                    name={"username"}
                    onChange={handleChange}
                    value={username}
                     required  />
              <i>Username</i>
            </div>
            <div className={LoginCss.inputbox}>
              <input type='password'
                    name={"password"}
                    onChange={handleChange}
                    value={password}
                    minLength='6' />
              <i>Password</i>
            </div>
            <div className={LoginCss.links}>
              <a >Forgot Password</a>
              <a ><Link to='/register'>Sign Up</Link></a> 
            </div>
            <div className={LoginCss.inputbox}>
          <input type="submit" onClick={handleLogin} value="Login" />
          {loginFailed && <p className={LoginCss.check}>Login failed, please try again.</p>}
          
            {isLoggedIn && <p className={LoginCss.check}>Login successful</p>}
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
   )
      } 
    </div>
    )
  }



export default Login;