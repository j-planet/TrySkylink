/**
 * Created by jj on 1/14/16.
 */

import { combineReducers } from 'redux';
import ChatroomReducer from './chatroom_reducer';

const rootReducer = combineReducers ({
    chatroom: ChatroomReducer
});

export default rootReducer;