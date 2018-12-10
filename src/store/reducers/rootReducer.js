import { combineReducers } from 'redux';

import authReducer from './auth';
import matchesReducer from './matches';

export default combineReducers({
    auth: authReducer,
    matches: matchesReducer,
});
