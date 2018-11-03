import React, { Component } from 'react';
import {BrowserRouter as Router , Route}  from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';


import './App.css';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import {logOutUser, setCurrentUser} from "./actions/authActions";



// to save the token info in redux
// it retain its state even after reloading

// check for token
if (localStorage.jwtToken){
    // Set Auth token header auth
    setAuthToken(localStorage.jwtToken);
    // Decode Token and get user info and expiry
    const decoded = jwt_decode(localStorage.jwtToken);
    // set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));




    // Check for Expired Token
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime){
        // Logout User
        store.dispatch(logOutUser());


         // Redirect to login
        window.location.href = '/login';


    }


}

class App extends Component {


    render(){
        return(
            <Provider store = {store} >
                <Router>
                  <div className="App">
                      <Navbar/>
                      <Route exact path="/" component={Landing} />
                      <div className="container">
                          <Route exact path="/register" component={Register} />
                          <Route exact path="/login" component={Login} />
                      </div>
                      <Footer/>
                  </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
