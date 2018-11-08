import React, { Component } from 'react';
import {BrowserRouter as Router , Route , Switch}  from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';


import './App.css';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import AddExperience from './components/add-edu-exper/AddExperience';
import AddEducation from './components/add-edu-exper/AddEducation';
import Profiles from './components/profiles/Profiles';
import SingleProfile from './components/singleProfile/SingleProfile';

import PrivateRoute from './components/common/PrivateRoute';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import {logOutUser, setCurrentUser} from "./actions/authActions";
import {clearCurrentProfile} from "./actions/profileAction";
import NotFound from './components/not-found/NotFound';
import Posts from "./components/posts/Posts";
import Post from "./components/SinglePost/SinglePost";


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

        // Clear Profile
        store.dispatch(clearCurrentProfile());

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
                          <Route exact path="/profiles" component={Profiles} />
                          <Route exact path="/profile/:handle" component={SingleProfile} />
                          <Route exact path="/not-found" component={NotFound} />


                          <Switch>
                          <PrivateRoute exact path="/dashboard" component={Dashboard} />
                          </Switch>

                          <Switch>
                              <PrivateRoute exact path="/create-profile" component={CreateProfile} />
                          </Switch>

                          <Switch>
                              <PrivateRoute exact path="/edit-profile" component={EditProfile} />
                          </Switch>

                          <Switch>
                              <PrivateRoute exact path="/add-experience" component={AddExperience} />
                          </Switch>

                          <Switch>
                              <PrivateRoute exact path="/add-education" component={AddEducation} />
                          </Switch>

                          <Switch>
                              <PrivateRoute exact path="/feed" component={Posts} />
                          </Switch>

                          <Switch>
                              <PrivateRoute exact path="/post/:id" component={Post} />
                          </Switch>






                      </div>
                      <Footer/>
                  </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
