
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import {GET_ERRORS , SET_CURRENT_USER} from './types';
// Register User

export const registerUser = (userData,history) => dispatch =>{

    axios.post('/api/users/register',userData)
        .then(res => history.push('/login'))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload:err.response.data
            })
        );
};


// we are using dispatch here only in case of error
// otherwise we don't need that shit



// Login - Get User Token

export const loginUser =  (userData) => dispatch =>{

    axios.post('/api/users/login',userData)
        .then(res => {
            // Save the LocalStorage
            const {token} = res.data;

            // Save token  to Local Storage
            localStorage.setItem('jwtToken',token);

            // Set token to Auth Header
            setAuthToken(token);

            // Decode token to get user data
            const decoded = jwt_decode(token);

            // Set current user
            dispatch(setCurrentUser(decoded));




        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload:err.response.data
            })
        );
};

// Set logged in User

export const setCurrentUser = (decoded) =>{
    return{
        type:SET_CURRENT_USER,
        payload:decoded
    }
};


// Log User out
export const logOutUser = () => dispatch => {

    //Remove token from localstorage
    localStorage.removeItem('jwtToken');

    // Remove auth header for future requests
    setAuthToken(false);
    // set current user to empty {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));


};