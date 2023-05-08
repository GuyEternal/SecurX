import React,{useState} from "react";
import { Link, useHistory } from "react-router-dom";
import RegisterCss from "./register.module.css"
import isEmail from 'validator/lib/isEmail';
import isLength from 'validator/lib/isLength';

function Register(){
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: ''
  });
  const [isRegister,setIsRegister]= useState(false);
  const [error, setError] = useState('');
  const baseURL = 'https://securex.onrender.com/api/auth';
  const { username, email, password, password2 } = formData;
  const history = useHistory();

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,[e.target.name]: e.target.value,
    }));
   
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    if (!isEmail(email)) {
      setError('Invalid email');
      return;
    }
    if (!isLength(password, { min: 6 })) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (password !== password2) {
      setError('Passwords do not match');
      return;
    }
    try {

      const res = await fetch(`${baseURL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
      });
      console.log(res.data);
      const json = await res.json();
      console.log(json);
      if(res.status===200){
        setIsRegister(true);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  if(isRegister){
    setTimeout(() => {
      history.push("/login");
    }, 2000); 
  }

    return(
      <div className={RegisterCss.register}>
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


    <div className={RegisterCss.signin}>
      <div className={RegisterCss.content}>
        <h2>Sign Up</h2>
        <div className={RegisterCss.form}>
          <div className={RegisterCss.inputbox}>
            <h3>Enter Username</h3>
            <input type="text" 
                  onChange={handleChange}
                  value={username}
                  name={"username"}
                  required />
            
          </div>
          <div className={RegisterCss.inputbox}>
            <h3>Enter Email</h3>
            <input type="email"
                  onChange={handleChange} 
                  name={"email"} 
                  value={email}
                  required />
            
          </div>
          <div className={RegisterCss.inputbox}>
            <h3>Set Password</h3>
            <input type="password" onChange={handleChange} name={"password"} value={password}
          required />
          </div>
          <div className={RegisterCss.inputbox}>
            <h3>Confirm Password</h3>
            <input type="password" onChange={handleChange} name={"password2"} value={password2} required />
          </div>
          <div className={RegisterCss.links}>
            <Link to='/login' className={RegisterCss.a}>Sign In</Link>
          </div>
          <div className={RegisterCss.inputbox}>
          {isRegister ? <p className={RegisterCss.reg}>Registerd successfully</p>:
            <input type="submit" onClick={handleSubmit} value="Register" />}
            {error && <p className={RegisterCss.err}>{error}</p>}
          </div>
        </div>
      </div>
    </div>
  </section>
  </div>
    )
}

export default Register;