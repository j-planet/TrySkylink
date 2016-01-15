/**
 * Created by jj on 1/14/16.
 */
// Reducer for the chatroom ROOM itself

import _ from 'lodash';

import Constants from './../constants.jsx';
import { CHANGE_ROOM_STATUS } from '../actions/chatroom_actions.jsx';



// the initial state. state of the user(s) in the room. add extra states (video/audio mute, user name, etc) later.
const _INITIAL_STATE =
{
    id: '',     // dunno what this is for
    isLocked: false,
    status: Constants.RoomState.IDLE
};


export default function(state = _INITIAL_STATE, action)
{
    console.log('>>> Reducer (room) received an action: ', action);

    switch (action.type) {
        case CHANGE_ROOM_STATUS:

            const newRoomStatus = action.payload;
            var newInfo = {status: newRoomStatus};

            // update isLocked property separately
            if (action.payload == Constants.RoomState.LOCKED) newInfo['isLocked'] = true;

            return _.extend({}, state, newInfo);
    }

    return state;
};