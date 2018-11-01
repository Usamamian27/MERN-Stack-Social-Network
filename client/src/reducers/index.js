// Root Reducer
// WE bring all our reducers here

import {combineReducers} from 'redux';
import authReducer from './authReducer';



export default combineReducers({

    auth: authReducer
});