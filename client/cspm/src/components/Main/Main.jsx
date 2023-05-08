import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import MainCss from './Main.module.css'

const Main = () => {
  const [websiteName, setWebsiteName] = useState('');
  const [websiteUsername, setWebsiteUsername] = useState('');
  const [websitePassword, setWebsitePassword] = useState('');
  const [passwords, setPasswords] = useState([]);
  const { id: userId } = useParams();
  const baseURL = 'https://securex.onrender.com/api/passwords';
  const [isLoading, setIsLoading] = useState(false);

  const handleAdd = () => {
    const newWebsite = {
      websiteName,
      websiteUsername,
      websitePassword,
    };

    axios.post(`${baseURL}/input/${userId}`, newWebsite)
      .then(res => {
        console.log(res.data);
        setWebsiteName('');
        setWebsiteUsername('');
        setWebsitePassword('');
        setPasswords(prevPasswords => [...prevPasswords, res.data.website]);
      })
      .catch(err => console.error(err));
  };

  const handleView = () => {
    setIsLoading(true);
    axios.get(`${baseURL}/login-credentials/${userId}`)
      .then(res => {
        console.log(res.data);
        setPasswords(res.data.passwords);
      })
      .catch(err => console.error(err))
      setIsLoading(false); 
     
  };

  useEffect(() => {
    handleView();
  }, []);

  return (
    <div className={MainCss.main_container}>
      <div className={MainCss.add_container}>
        <h2>Add a new website:</h2>
        <div className={MainCss.input_container}>
          <input type="text" placeholder="Website Name" value={websiteName} onChange={e => setWebsiteName(e.target.value)} />
          <input type="text" placeholder="Username" value={websiteUsername} onChange={e => setWebsiteUsername(e.target.value)} />
          <input type="password" placeholder="Password" value={websitePassword} onChange={e => setWebsitePassword(e.target.value)} />
        </div>
        <button className={MainCss.add_btn}onClick={handleAdd}>Add</button>
      </div>

      {isLoading ? (
        <div className={MainCss.loading_container}>
          <div className={MainCss.loading_animation}></div>
          <p>Loading Passwords...</p>
        </div>
      ) : (
        <div className={MainCss.passwords_container}>
          <h2>Your passwords:</h2>
          {passwords.map((password, index) => (
            <div className={MainCss.password_card} key={index}>
              <div className={MainCss.website_info}>
                <p className={MainCss.website_name}><strong>Website:</strong> {password.websiteName}</p>
                <p className={MainCss.website_username}><strong>Username:</strong> {password.websiteUsername}</p>
              </div>
              <div className={MainCss.password_info}>
                <p className={MainCss.password_title}><strong>Password:</strong></p>
                <button className={MainCss.show_password_btn} onClick={() => setPasswords(prevPasswords => {
                  const newPasswords = [...prevPasswords];
                  newPasswords[index].showPassword = !newPasswords[index].showPassword;
                  return newPasswords;
                })}>
                  {password.showPassword ? password.websitePassword : 'Show Password'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <button className={MainCss.view_btn} onClick={handleView}>View Passwords</button>
    </div>
  );
};

export default Main;
