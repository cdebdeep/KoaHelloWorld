import {combineReducers}  from 'redux';
import UserReducer from './reducer-users';
import SelectedUserReducer from './reducer-selected-user'

const  allReducers = combineReducers({
    users:UserReducer,
    selectedUser:SelectedUserReducer
});

export default allReducers;