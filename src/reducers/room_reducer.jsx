/**
 * Created by jj on 1/14/16.
 */
// Reducer for the chatroom ROOM itself

import Constants from './../constants.jsx';
import { CHANGE_ROOM_STATUS } from '../actions/chatroom_actions.jsx';


// the initial state. state of the user(s) in the room. add extra states (video/audio mute, user name, etc) later.
const _initialState =
{
    id: '',     // dunno what this is for
    isLocked: false,
    status: Constants.RoomState.IDLE
};

export default function(state = _initialState, action)
{
    console.log('>>> Reducer (room) received an action: ', action);

    switch (action.type) {
        case CHANGE_ROOM_STATUS:
            return
    }

    return state;
};