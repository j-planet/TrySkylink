// Reducer for USERS in a chatroom

import Constants from '../constants.jsx';
import { ADD_PEER_NO_STREAM } from '../actions/users_action.jsx';

const _INITIAL_STATE =
    [
        {
            id: Constants.SelfId,
            name: 'Self',
            stream: null,
            updatedStreamRender: 0,
            error: null
        }
    ];

export default function(state = _INITIAL_STATE, action)
{
    console.log('>>> Reducer (users) received an action: ', action);

    switch (action.type) {
        case ADD_PEER_NO_STREAM:
            const newUser = action.payload;
            return state.map(user => (user.id === newUser.id) ? newUser : user);
    }

    return state;
}