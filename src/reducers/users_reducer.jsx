// Reducer for USERS in a chatroom

import Constants from '../constants.jsx';

const _INITIAL_STATE =
    [
        {
            id: Constants.SelfId,
            name: 'Self',
            stream: null,
            updatedStreamRender: 0
        }
    ];

export default function(state = _INITIAL_STATE, action)
{
    console.log('>>> Reducer (users) received an action: ', action);

    return state;
}