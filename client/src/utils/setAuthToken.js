// fuction to attach token to auth header



import axios from 'axios';

const setAuthToken = (token) =>{

    if(token){
        // apply to every request
        axios.defaults.headers.common['Authorization'] = token;
    }
    else {
        // Delete Auth Header
        delete axios.defaults.headers.common['Authorization'];
    }
};

export default setAuthToken;