import { combineReducers } from '@reduxjs/toolkit';
import usersSlice from './usersSlice';
const transformReducers = combineReducers({
    usersSlice,
})
export default transformReducers