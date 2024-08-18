// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../components/Home/Home.jsx';
import Login from '../components/Login/Login.jsx'; // assuming you have a Login component
import Register from '../components/Register/Register.jsx'; // assuming you have a Register component
import Main from '../components/Dashboard/Dashboard.jsx'; // assuming you have a Main component
import axios from 'axios';
axios.defaults.withCredentials = true;

const NotFound = () => {
  return (
    <>
      <h1 style={{ textAlign: "center", padding: "2rem" }}>404 - Page Not Found</h1>
      <p style={{ textAlign: "center", padding: "2rem" }}>Sorry, the page you are looking for could not be found.</p>
    </>
  );
};

function App() {

  return (
    <Router>
      <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/Main/:id" component={Main} />
      <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
