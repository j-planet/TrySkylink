/**
 * Created by jj on 1/14/16.
 */

import { combineReducers } from 'redux';
import RoomReducer from './room_reducer';
import UsersReducer from './users_reducer.jsx';

const rootReducer = combineReducers(
    {
        room: RoomReducer,
        users: UsersReducer
    }
);

export default rootReducer;