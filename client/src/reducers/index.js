import { combineReducers } from 'redux';

import posts from './postReducer';

const reducers = combineReducers({ posts });

export default reducers;