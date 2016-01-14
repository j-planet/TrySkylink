/**
 * Created by jj on 1/14/16.
 */

import Constants from './constants.jsx';

// the initial state. state of the user(s) in the room. add extra states (video/audio mute, user name, etc) later.
const _initialState = {
    users: [
        {
            id: 0,
            stream: null
        }
    ],
    room: {
        id: '',     // dunno what this is for
        isLocked: false,
        status: Constants.RoomState.IDLE
    }
};

export default function(state = _initialState, action)
{
    console.log('>>> Reducer (chatroom) received an action: ', action);

    return state;
};