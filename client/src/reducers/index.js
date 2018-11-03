// Root Reducer
// WE bring all our reducers here

import {combineReducers} from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';




export default combineReducers({

    auth: authReducer,
    errors: errorReducer
});